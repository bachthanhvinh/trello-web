import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import hacking from '~/assets/hacking.png'
import react from '~/assets/react.svg'
import trello from '~/assets/trello.svg'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MENU_STYLES = {
  color: 'primary.main',
  bgcolor: 'white',
  paddingX: '5px',
  borderRadius: '6px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        height: (theme) => theme.trello.boardBarHeight,
        width: '100%',
        display: 'flex',
        alignItems:  'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        borderTop: '1px solid #00bfa5',
        overflowX: 'auto'
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Trello Web"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />} >Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16
            }
          }}
        >
          <Tooltip title='trello'>
            <Avatar alt="Remy Sharp" src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png' />
          </Tooltip>
          <Tooltip title='hacking'>
            <Avatar alt="Remy Sharp" src={hacking} />
          </Tooltip>
          <Tooltip title='trello'>
            <Avatar alt="Remy Sharp" src='https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-1/435730941_1479298869606519_3434163185530098561_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_ohc=7Ht2Ra0_dJwQ7kNvwElYRba&_nc_oc=AdktK2J-PfHdAfgIqwFzG7oprCG3lADcYGtRXcxUwduzk7po0I9J8MRUoK7xspeE0isjX43SDoQpAef4NIEqgZuu&_nc_zt=24&_nc_ht=scontent.fhan14-3.fna&_nc_gid=q7YBAmDM0tErl5iyiQIbHw&oh=00_AfQ7jsMR_Znx9TQMWtLsqGYC6QkDUIMuStvB4qVdxoOPlA&oe=68903298' />
          </Tooltip>
          <Tooltip title='trello'>
            <Avatar alt="Remy Sharp" src={trello} />
          </Tooltip>
          <Tooltip title='react'>
            <Avatar alt="Remy Sharp" src={react} />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
