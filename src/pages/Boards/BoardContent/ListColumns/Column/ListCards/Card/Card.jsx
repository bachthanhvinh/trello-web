import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


const Card = ({ card }) => {

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #4a69bd' : undefined
  }

  return (
    <>
      <MuiCard
        style={dndKitCardStyles}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          // overflow: 'unset',
          // display: card?.FE_PlaceholderCard ? 'none' : 'block'
          overflow:  card?.FE_PlaceholderCard === true ? 'hidden' : 'unset',
          height: card?.FE_PlaceholderCard === true ? '0px' : 'unset'

        }}>
        {card?.cover && <CardMedia sx={{ height: 140, borderRadius: '5px 5px 0 0' }} image={card?.cover} title="green iguana" /> }

        <CardContent sx={{
          p: 1.5,
          '&:last-child': { p: 1.5 }
        }}>
          <Typography >{card?.title}</Typography>
        </CardContent>
        { shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }} >
          {!!card?.memberIds?.length &&
            <Button size="small" startIcon={<PeopleIcon />}>{card?.memberIds?.length}</Button>
          }
          {!!card?.comments?.length &&
            <Button size="small" startIcon={<ChatIcon />}>{card?.comments?.length}</Button>
          }
          {!!card?.attachments?.length &&
            <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments?.length}</Button>
          }

        </CardActions>
        }

      </MuiCard>
    </>
  )
}

export default Card