import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect'
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
import { Badge, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

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
      gap: 2
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
          <MenuIcon sx={{ color: 'primary.main' }} />
        </IconButton>
        <Menu
          id="menu-appbar"
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
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {MenusHeader.map(({ label, component: ComponentMenus }) => (
            <MenuItem key={label} >
              <Typography component="div" sx={{ textAlign: 'center' }}>{<ComponentMenus />}</Typography>
            </MenuItem>
          ))}
          <MenuItem>
            <Button sx={{ textAlign: 'center' }} variant="outlined">Create</Button>
          </MenuItem>
        </Menu>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }} >Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <TextField id="outlined-search" size='small' label="Search" type="search" sx={{ minWidth: '80px' }} />
        <Box sx={{ display: { xs: 'none', sm: 'flex', md: 'none' } }}>
          <ModeSelector />
        </Box>
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer', color: 'primary.main' }} >
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>

        <Tooltip title="Help" sx={{ cursor: 'pointer', color: 'primary.main' }}>
          <HelpOutlineIcon />
        </Tooltip>

        <Profiles />

      </Box>
    </Box>
  )
}

export default Responsive