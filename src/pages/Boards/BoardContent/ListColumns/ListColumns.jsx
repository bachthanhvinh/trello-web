import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

const ListColumns = ({ columns }) => {
//The <SortableContext> component requires that you pass it the sorted array of the unique identifiers associated to each sortable item via the items prop.
// This array should look like ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}].
//All you have to do is map your items array to an array of strings that represent the unique identifiers for each item:
// https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        with: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '& > :last-of-type': {
          mr: 2
        },
        '& > :first-of-type': {
          ml: 2
        },
        '&::-webkit-scrollbar-track': {
          mx: 2
        }
      }}>
        {/*  box column test 1 */}

        {columns?.map(column => <Column key={column._id} column={column} />) }


        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}>
          <Button startIcon={<NoteAddIcon />} sx={{
            color: 'white',
            width: '100%',
            py: 1
          }}>Add new column</Button>
        </Box>
      </Box>
    </SortableContext>

  )
}

export default ListColumns