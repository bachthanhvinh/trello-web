import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import worldGirl from '~/assets/worldGirl.jpg'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Card = (props) => {
  const { temporaryHideMedia } = props
  if (temporaryHideMedia) {
    return (
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography >Vinhdev</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <>
      <MuiCard sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset'
      }}>
        <CardMedia
          sx={{ height: 140, borderRadius: '5px 5px 0 0' }}
          image={worldGirl}
          title="green iguana"
        />
        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography >Vinhdev</Typography>
        </CardContent>
        <CardActions sx={{ p: '0 4px 8px 4px' }} >
          <Button size="small" startIcon={<PeopleIcon />}>20</Button>
          <Button size="small" startIcon={<ChatIcon />}>15</Button>
          <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
        </CardActions>
      </MuiCard>
    </>
  )
}

export default Card