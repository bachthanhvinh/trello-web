import Box from '@mui/material/Box'
import ModeSelector from '~/components/ModeSelect'
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
import { Badge, Menu, MenuItem, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'

function AppBar() {

  const MenusHeader = [Workspaces, Recent, Starred, Templates]

  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 10px',
        gap: 2,
        overflowX: 'auto'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bolđ', color: 'primary.main' }} >Trello</Typography>
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }} >
          <TextField id="outlined-search" size='small' label="Search" type="search" />
          <ModeSelector />

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
      <Box sx={{
        height: (theme) => theme.trello.appBarHeight,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-between',
        padding: '0px 10px'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* <AppsIcon sx={{ color: 'primary.main' }} /> */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {MenusHeader.map((nav) => (
              <MenuItem key={nav} onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center' }}>{nav}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bolđ', color: 'primary.main' }} >Trello</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Workspaces />
            <Recent />
            <Starred />
            <Templates />
            <Button variant="outlined">Create</Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }} >
          <TextField id="outlined-search" size='small' label="Search" type="search" sx={{ minWidth: '120px' }} />
          <ModeSelector />

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
    </>
  )
}

export default AppBar

