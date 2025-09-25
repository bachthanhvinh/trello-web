import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import {
  updateBoardDetailsApi,
  MoveCardToDifferentColumnsApi,
  updateColumnDetailsApi
} from '~/apis'
import { cloneDeep } from 'lodash'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
  fetchBoardDetailsAPI
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function Board() {
  const dispatch = useDispatch()
  // không dùng State của component nữa mà chuyển qua dùng State của Redux
  // const [board, setBoard] = useState(null)
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()
  useEffect( () => {

    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])


  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    // Trường hợp dùng Spread Operator này thì lại không sao bởi vì ở đây chúng ta không dùng push
    // làm thay đổi trực tiếp mạng, mà chỉ đang gán lại toàn bộ giá trị Columns và ColumnOrderIds
    // bằng 2 mảng mới.
    const cloneBoard = { ...board }
    cloneBoard.columns = dndOrderedColumns
    cloneBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(cloneBoard))

    updateBoardDetailsApi(cloneBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCards = (dndOrderedCards, dndCardOrderIds, columnId ) => {
    const cloneBoard = cloneDeep(board)
    const columnToUpdate = cloneBoard.columns.find(column => column._id === columnId._id)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndCardOrderIds
    }

    dispatch(updateCurrentActiveBoard(cloneBoard))

    updateColumnDetailsApi(columnId._id, { cardOrderIds: dndCardOrderIds })
  }

  const moveCardToDifferentColumn = (currentCard, prevOldColumns, nextColumns, dndOrderedColumns) => {

    const dndColumnOrderedIds = dndOrderedColumns.map(c => c._id)
    const cloneBoard = { ...board }
    cloneBoard.columns = dndOrderedColumns
    cloneBoard.columnOrderIds = dndColumnOrderedIds

    dispatch(updateCurrentActiveBoard(cloneBoard))


    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevOldColumns)?.cardOrderIds
    // nếu kéo hết card ra khỏi column thì cần check để không đẩy placeholder-card lên api gây lỗi
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []


    MoveCardToDifferentColumnsApi({
      currentCard,
      prevOldColumns,
      prevCardOrderIds,
      nextColumns,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumns)?.cardOrderIds
    })
  }


  if (!board) {
    return <PageLoadingSpinner caption="Loading Board..." />
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}


        moveColumns={moveColumns}
        moveCards={moveCards}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board
