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
import capitalizeFirstLetter from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  paddingX: '5px',
  borderRadius: '6px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
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
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': {
          mx: 2
        }
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} >
        <Tooltip title={`${board?.description}`}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
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
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            transition: '0.5s',
            '&:hover': { borderColor: 'white', bgcolor: '#d1d6db14' }
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
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
            <Avatar alt="Remy Sharp" src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'/>
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
