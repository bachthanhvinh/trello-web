import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect/ModeSelect'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Workspaces from '~/components/AppBar/Menus/Workspaces'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import AppsIcon from '@mui/icons-material/Apps'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function Responsive() {

  const MenusHeader = [
    { label: 'Workspaces', component: Workspaces },
    { label: 'Recent', component: Recent },
    { label: 'Starred', component: Starred },
    { label: 'Templates', component: Templates }
  ]

  const [checkOpenClose, setCheckOpenClose] = useState(null)

  const handleOpenMenu = (event) => {
    setCheckOpenClose(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setCheckOpenClose(null)
  }

  return (
    <Box sx={{
      height: (theme) => theme.trello.appBarHeight,
      display: { xs: 'flex', ms:'flex', md: 'flex', lg: 'none' },
      justifyContent: 'space-between',
      padding: '0px 10px',
      gap: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* <AppsIcon sx={{ color: 'primary.main' }} /> */}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          color="inherit"
          sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}
        >
          <MenuIcon sx={{ color: 'white' }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          bgcolor='red'
          anchorEl={checkOpenClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(checkOpenClose)}
          onClose={handleCloseMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiList-root': {
              bgcolor:'#2c3e50'
            }
          }}
        >
          {MenusHeader.map(({ label, component: ComponentMenus }) => (
            <MenuItem key={label} >
              <Typography component="div" sx={{ textAlign: 'center' }}>{<ComponentMenus />}</Typography>
            </MenuItem>
          ))}
          <MenuItem>
            <Button
              sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
              variant="outlined"
              startIcon={<AddToPhotosIcon />}
            >
            Create</Button>
          </MenuItem>
        </Menu>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title="Board list">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
          <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'white' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }} >Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <AutoCompleteSearchBoard />

        <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}>
          <ModeSelector />
        </Box>
        {/* Xử lý hiện thị các thông báo - notificatios ở đây */}
        <Notifications />

        <Tooltip title="Help" sx={{ display: { xs: 'none', sm: 'flex', md: 'none' }, cursor: 'pointer', color: 'white' }}>
          <HelpOutlineIcon />
        </Tooltip>

        <Profiles />

      </Box>
    </Box>
  )
}

export default Responsive