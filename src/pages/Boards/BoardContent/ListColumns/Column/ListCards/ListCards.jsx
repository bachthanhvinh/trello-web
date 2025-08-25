import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'


const ListCards = ({ cards }) => {

  return (
    <SortableContext items={ cards ? cards?.map(c => c._id) : []} strategy={verticalListSortingStrategy}>

      <Box sx={{
        p: '0 5px 5px 5px',
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
    </SortableContext>

  )
}

export default ListCards