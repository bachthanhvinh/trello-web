import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Workspaces from '~/components/AppBar/Menus/Workspaces'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Badge, InputAdornment, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from '~/components/AppBar/Menus/Profiles'
import Responsive from '~/components/AppBar/Responsive'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function AppBar() {
  const [isInput, setIsInput] = useState('')
  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        gap: 2,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to={'/boards'}>
            <Tooltip title="Board list">
              <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
            </Tooltip>
          </Link>
          <Link to={'/'}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'white' }} />
              <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }} >Trello</Typography>
            </Box>
          </Link>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
            variant="outlined"
            startIcon={<AddToPhotosIcon />}
          >
            Create</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
          <TextField
            id="outlined-search"
            size='small'
            label="Search..."
            type="text"
            autoComplete='off'
            value={isInput}
            onChange={(e) => setIsInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    onClick={() => setIsInput('')}
                    fontSize='small'
                    sx={{
                      display: isInput ? 'flex' : 'none',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              minWidth: '150px',
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
          <ModeSelector />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer', color: 'white' }} >
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>

          <Tooltip title="Help" sx={{ cursor: 'pointer', color: 'white' }}>
            <HelpOutlineIcon />
          </Tooltip>

          <Profiles />

        </Box>

      </Box>
      <Responsive />
    </>
  )
}

export default AppBar

