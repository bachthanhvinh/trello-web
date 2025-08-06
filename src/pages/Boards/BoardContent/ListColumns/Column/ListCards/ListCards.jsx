import Box from '@mui/material/Box'
import Card from './Card/Card'

const ListCards = ({ cards }) => {

  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} -
      ${theme.spacing(3)} -
      ${theme.trello.columnHeaderHeight} -
      ${theme.trello.columnFooterHeight}
      )`,
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#bec0cdff' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#aaafc4ff' }
    }}
    >
      {/* Card */}
      {cards?.map(card => <Card key={card._id} card={card} />)}


    </Box>
  )
}

export default ListCards