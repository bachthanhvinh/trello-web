import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import {
  // PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'
function BoardContent({ board }) {

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

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    // console.log('handleDragEnd', event)
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 cái console.log() này để sau này xử lý gọi api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // console.log('dndOrderedColumns', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds', dndOrderedColumnsIds)
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '5.5px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
