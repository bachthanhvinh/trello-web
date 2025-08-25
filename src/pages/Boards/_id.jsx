import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsApi } from '~/apis'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect( () => {
    const boardId = '68aad23695a530a3c2e42035'

    fetchBoardDetailsApi(boardId).then(board => {
      setBoard(board)
    })

  }, [])


  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
