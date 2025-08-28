import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi, createColumnApi, createCardApi } from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '68af27bc1c40c6814fa2d5e6'

    fetchBoardDetailsApi(boardId).then(board => {
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      setBoard(board)
    })

  }, [])

  const createNewColumn = async (newColumn) => {
    const createdColumn = await createColumnApi({
      ...newColumn,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCard) => {
    const createdCard = await createCardApi({
      ...newCard,
      boardId: board._id
    })

    const cloneBoard = cloneDeep(board)
    const columnToUpdate = cloneBoard.columns.find( column => column._id === createdCard.columnId )
    if (columnToUpdate) {
      columnToUpdate.cards = columnToUpdate.cards || []
      columnToUpdate.cardOrderIds = columnToUpdate.cardOrderIds || []
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(cloneBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board
