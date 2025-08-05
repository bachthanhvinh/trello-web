import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const ListColumns = () => {

  return (
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
      <Column />
      <Column />
      <Column />
      <Column />
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
  )
}

export default ListColumns