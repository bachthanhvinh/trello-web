import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import { TextField } from '@mui/material'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { createCardApi, deleteColumnAndCardApi, updateColumnDetailsApi } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

const Column = ({ column }) => {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndkitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    // chiếu cao max 100% vì bị lỗi khi kéo từ một column ngắn sang một có column 100%
    // bị khựng nên phải chỉnh toàn bộ lên 100%
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const [newCardTitle, setNewCardTilte] = useState('')
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)


  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please Enter card title', { position: 'bottom-right' })
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    const createdCard = await createCardApi({
      ...newCardData,
      boardId: board._id
    })
    // cái này cũng tương tự sử dụng Deep copy
    const cloneBoard = cloneDeep(board)
    const columnToUpdate = cloneBoard.columns.find( column => column._id === createdCard.columnId )

    if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
      columnToUpdate.cards = [createdCard]
      columnToUpdate.cardOrderIds = [createdCard._id]

    } else {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }

    dispatch(updateCurrentActiveBoard(cloneBoard))

    setOpenNewCardForm()
    setNewCardTilte('')
  }

  const checkEnterAddCard = (e) => {
    if (e.key === 'Enter') {
      addNewCard()
    }

  }
  const closeFormNewCard = () => {

    toggleOpenNewCardForm()
    setNewCardTilte('')
  }
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column?',
      description: 'This action will permanently delete your column and its Cards! Are you sure?',

      confirmationText: 'Confirm',
      cancellationText: 'Cancel'

      // allowClose: false,
      // dialogProps: { maxWidth: 'xs' },
      // cancellationButtonProps: { color: 'primary' },
      // confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
      // buttonOrder: ['confirm', 'cancel']
    }).then(() => {

      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      dispatch(updateCurrentActiveBoard(newBoard))

      deleteColumnAndCardApi(column._id).then(res => {
        toast.success(res?.deleteResult)
      }
      )

    }
    ).catch(() => {})

  }

  const onUpdateColumnTitle = (newTitle) => {

    updateColumnDetailsApi(column._id, { title: newTitle }).then(() => {
      const cloneBoard = cloneDeep(board)
      const columnToUpdate = cloneBoard.columns.find(c => c._id === column._id)
      if (columnToUpdate) columnToUpdate.title = newTitle

      dispatch(updateCurrentActiveBoard(cloneBoard))
    })
  }

  const orderedCards = column.cards

  return (
    <div
      style={dndkitColumnStyles}
      ref={setNodeRef}
      {...attributes}
    >
      <Box
      // để đây vì muốn khu vực nào được kéo thì để ở đó vì listenners
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          ml: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(3)})`,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }} >
        <Box sx={{
          height: (theme) => (theme.trello.columnHeaderHeight),
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>

          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateColumnTitle}
            data-no-dnd='true'
          />
          {/* Box column Header  */}
          <Box>
            <Tooltip title="More Options">
              <ExpandMoreIcon
                sx={{
                  color: 'text.primary',
                  cursor: 'pointer'
                }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-column-dropdown'
                }
              }}
            >
              <MenuItem sx={{
                '&:hover': { color: 'green', transition: '0.5s', '& .add-card-icon': { color: 'green', transition: '0.5s' } }
              }}
              onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon>
                  <AddCardIcon className='add-card-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText >Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ⌘X
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ⌘C
                </Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ⌘V
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem sx={{
                '&:hover': { color: 'warning.dark', transition: '0.5s', '& .delete-forever-icon': { color: 'warning.dark', transition: '0.5s' } }
              }}
              onClick={() => handleDeleteColumn()}
              >
                <ListItemIcon >
                  <DeleteForeverIcon className='delete-forever-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText > Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Web Clipboard</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

        </Box>

        {/* box List cards */}

        <ListCards cards={orderedCards} />

        {/* box footer */}
        <Box sx={{
          height: (theme) => (theme.trello.columnFooterHeight),
          p: 2
        }}>
          {!openNewCardForm
            ?
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button onClick={toggleOpenNewCardForm} startIcon={<AddCardIcon />}>Add new Card</Button>
              <Tooltip title='Drag to move' >
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                size='small'
                label="Enter card title..."
                type="text"
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={newCardTitle}
                onChange={(e) => setNewCardTilte(e.target.value)}
                onKeyDown={checkEnterAddCard}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor:  (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor:  (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Button
                  className="interceptor-loading"
                  data-no-dnd='true'
                  onClick={addNewCard}
                  variant='contained' color='success' size="small"
                  sx={{
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}

                >Add </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer',
                    transition: '0.4s'
                  }}
                  onClick={closeFormNewCard}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column