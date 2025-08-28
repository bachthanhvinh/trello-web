import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  // PointerSensor,
  useSensor,
  useSensors,
  // MouseSensor,
  // TouchSensor,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
  pointerWithin,
  DndContext,
  // rectIntersection,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibrary/DndKitSensors'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, createNewColumn, createNewCard }) {

  // yêu cầu chuột phải di chuyển 10px với được thực hiện event, fix trường hợp click bị event
  // nếu sử dụng pointerSensor thì phải sử dụng thêm thuộc tính
  // CSS touch-action: none ở những phần tử kéo thả - nhưng mà còn bug
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  // nhấn giữa 250ms và dung sai của cảm ứng (hiểu là di cuyển/chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: {
    delay: 250,
    tolerance: 5
  } })
  //Ưu tiên sử dụng  kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // vì pointerSensor là default nó sẽ không tối ưu tốt bàng cách sự dung cái mình cần
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)
  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm một cái Column theo cardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.carOrderIds bời vì ở bước handleDraOver chúng ta sẽ
    // làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOderIds mới.
    return orderedColumns.find(column => column?.cards?.map(card => card?._id)?.includes(cardId))
  }

  const moveCardBetweentDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tìm bị trí (index) của cái overCard trong column đích nơi mà activeCard sắp được đặt
      const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
      // console.log('overCardIndex', overCardIndex)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //Clone Mảng OrderedColumnsState cũ ra một cái cũ để xử lý data rồi return - cập nhật tại
      // OrderedColumnsState mới
      const nextColumn = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumn.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumn.find(column => column._id === overColumn._id)
      if (nextActiveColumn) {
        // Khi mà kéo card muốn kéo qua một cái column khác thì xóa card vừa kéo ở column cũ
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm Placeholder Card nếu Column rỗng: bị kéo hết Card đi, không còn cái nào nữa.
        if (isEmpty(nextActiveColumn.cards)) {
          // console.log('hết card rồi')
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }


      if (nextOverColumn) {

        //kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Đối với trường hợp dragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card
        // giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId : nextOverColumn._id
        }

        //Thêm card đang kéo vào một column mới mà overColumn kéo vào
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Nếu mà trong column có tồn tại cards rồi thì xóa card Placehoder dữ chỗ đi
        nextOverColumn.cards = nextOverColumn?.cards.filter(card => card._id !== 'column-id-03-placeholder-card')

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      // console.log('nextColumn', nextColumn)
      return nextColumn
    })
  }

  //Trigger khi bắt đầu kéo 1 phần tử drag
  const handleDragStart = (event) => {
    // console.log('handleDragStart', event)
    setActiveDragItemId(event?.active?.id),
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá tình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    // không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    // console.log('handleDragOver', event)
    const { active, over } = event

    // kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return lôn tránh lỗi)
    if (!active || !over) return

    // activeDraggingCard: là cái card đang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over

    // console.log('activeDraggingCardData', activeDraggingCardData)

    // tìm 2 cái colums theo CardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // nếu không tồn tại 1 trong 2 column thì không làm gì hết, tranh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau
    // còn xử lý kéo xong xuôi thì nó lại là vấn đề khác ở (hanldeDragEnd)
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweentDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }
  //Trigger khi kết thức hành động thả drop
  const handleDragEnd = (event) => {

    // console.log('handleDragEnd', event)
    const { active, over } = event
    // kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return lôn tránh lỗi)
    if (!active || !over) return
    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
    // activeDraggingCard: là cái card đang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over

      // console.log('activeDraggingCardData', activeDraggingCardData)

      // tìm 2 cái colums theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // console.log('activeColumn', activeColumn)
      // console.log('overColumn', overColumn)
      // console.log('oldColumn', oldColumn)

      // nếu không tồn tại 1 trong 2 column thì không làm gì hết, tranh crash trang web
      if (!oldColumn || !overColumn) return

      // Hành động kéo thả card giữa 2 column khác nhau
      // Phải dùng tới activeDragitemData.columnId hoặc oldColum._id (set vào state từ bước
      //handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver
      // tới đây là state của card đã bị cập nhật một lần rồi
      // console.log('oldColumn', oldColumn)
      // console.log('activeDraggingCardData', activeDraggingCardData)
      if (oldColumn._id !== overColumn._id) {
        moveCardBetweentDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Lấy vị trí cũ (từ  oldColumn)
        const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDragItemId)
        // lấy vị trí mới (từ over)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        //Dùng arrayMove vì kéo card trong một cái column thì tương tự với logic kéo loumn trong một cái
        // board content
        const dndOrderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {

          //Clone Mảng OrderedColumnsState cũ ra một cái cũ để xử lý data rồi return - cập nhật tại
          // OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          //Cập nhật lại 2 giắ trị mới là card và carOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

          // trả về vị trí state mới (chuẩn vị trí)
          return nextColumns
        })

      }

    }
    // xử lý kéo thả Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      // Lấy vị trí cũ (từ  active)
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      // lấy vị trí mới (từ over)
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      // 2 cái console.log() này để sau này xử lý gọi api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)
      setOrderedColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumn(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: '0.5' }
      }
    })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // tìm các điểm giao nhau, va chạm - intersections với trỏ chuột
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return
    // Thuật toán phát hiện va chạm sẽ trả về một mảng các và chạm ở đây
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {
    // fix flickering
    // nếu cái over nó là column thì sẽ tìm tới cardId gần nhất bên trong khu vực va chạm đó dựa vào
    // thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Nhưng mà closestCorners mượt hơn
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        // console.log('overId before', overId)
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id)
          })
        })[0]?.id

        // console.log('overId after', overId)
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      // collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '5.5px 0'
        }}>
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData}/>}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
