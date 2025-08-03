import { Button } from '@mui/material'
import Box from '@mui/material/Box'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      // display: 'flex',
      // gap: 2,
      // ml: 2

    }}>
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'blue' : '#ecf0f1'),
      }} >
        <Box sx={{
          height: COLUMN_HEADER_HEIGHT,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          Comlumn Header
        </Box>
        <Box sx={{
        }}>
          <Box sx={{
            bgcolor: '#1abc9c',
            margin: '10px',
            padding: '15px',
            borderRadius: '5px'
          }}
          >Card</Box>

          <Box sx={{
            bgcolor: '#1abc9c',
            margin: '10px',
            padding: '15px',
            borderRadius: '5px'
          }}
          >Card</Box>
          <Box sx={{
            bgcolor: '#1abc9c',
            margin: '10px',
            padding: '15px',
            borderRadius: '5px'
          }}
          >Card</Box>
          <Box sx={{
            bgcolor: '#1abc9c',
            margin: '10px',
            padding: '15px',
            borderRadius: '5px'
          }}
          >Card</Box>
        </Box>
        <Button sx={{
          height: COLUMN_FOOTER_HEIGHT,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>+ Add Card</Button>
      </Box>
      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'blue' : 'red'),
        padding: '0 10px'
      }} >
        {/* <Box sx={{
          height: COLUMN_FOOTER_HEIGHT
        }} >
          Footer
        </Box> */}
      </Box>
    </Box>
  )
}

export default BoardContent
