import Box from '@mui/material/Box'
import ModeSelector from '../ModeSelect'

function AppBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      height: (theme) => theme.trello.appBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end'
    }}>
      <ModeSelector />
    </Box>
  )
}

export default AppBar
