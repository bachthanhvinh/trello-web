import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
import {
  // Experimental_CssVarsProvider as CssVarsProvider,
  // experimental_extendTheme as extendTheme,
  useColorScheme
} from '@mui/material/styles'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
function ModeSmall() {
  const { mode, setMode } = useColorScheme()


  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="select-dark-light-mode"
        id="select=dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
            <SettingsBrightnessIcon fontSize='small' />Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} ></Box><Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DarkModeOutlinedIcon fontSize='small'/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
function App() {


  // function ModeToggle() {
  //   const { mode, setMode } = useColorScheme()

  //   return (
  //     <Button
  //       onClick={() => {
  //         setMode(mode === 'light' ? 'dark' : 'light')
  //       }}
  //     >
  //       {mode === 'light' ? 'Turn dark' : 'Turn light'}
  //     </Button>
  //   )
  // }

  return (
    <>
      <ModeSmall />
      <br />
      <hr />
      {/* <ModeToggle /> */}
      <hr />
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
