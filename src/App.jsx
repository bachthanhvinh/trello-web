import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles'
function App() {

  function ModeToggle() {
    const { mode, setMode } = useColorScheme()
    return (
      <Button
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light')
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
    )
  }
  return (
    <>
      <ModeToggle />
      <div>bachthanhvinh</div>
      <Typography variant='body2' color="text.secondary" >study</Typography>
      <Button variant="contained">Hello world</Button>
      <Button variant="text">Contained</Button>
      <Button variant="outlined">Oulined</Button>
      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}
export default App
