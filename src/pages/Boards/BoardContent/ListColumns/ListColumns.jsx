import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button, TextField } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'

const ListColumns = ({ columns }) => {

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      toast.error('Please Enter column title')
      return
    }

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  const closeFormNewColumn = () => {

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  //The <SortableContext> component requires that you pass it the sorted array of the unique identifiers associated to each sortable item via the items prop.
  // This array should look like ["1", "2", "3"], not [{id: "1"}, {id: "2}, {id: "3}].
  //All you have to do is map your items array to an array of strings that represent the unique identifiers for each item:
  // https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512

  return (
    <SortableContext items={columns ? columns?.map(c => c._id) : []} strategy={horizontalListSortingStrategy}>
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

        {columns?.map(column => <Column key={column?._id} column={column} />) }

        { !openNewColumnForm
          ?
          <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            cursor: 'pointer'
          }}
          >
            <Button startIcon={<NoteAddIcon />} sx={{
              color: 'white',
              width: '100%',
              py: 1
            }}>Add new column</Button>
          </Box>
          :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              size='small'
              label="Enter column title..."
              type="text"
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}

              >Add Column</Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  transition: '0.4s',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={closeFormNewColumn}
              />
            </Box>
          </Box>
        }

      </Box>
    </SortableContext>

  )
}

export default ListColumns