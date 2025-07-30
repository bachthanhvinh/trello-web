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
import { Badge, Tooltip } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from '~/components/AppBar/Menus/Profiles'
import Responsive from '~/components/AppBar/Responsive'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

function AppBar() {

  return (
    <>
      <Box sx={{
        height: (theme) => theme.trello.appBarHeight,
        width: '100%',
        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: 2,
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }} >Trello</Typography>
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined" startIcon={<AddToPhotosIcon />}>Create</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
          <TextField id="outlined-search" size='small' label="Search..." type="search" sx={{ minWidth: '150px' }} />
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
      <Responsive />
    </>
  )
}

export default AppBar

