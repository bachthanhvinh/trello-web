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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import worldGirl from '~/assets/worldGirl.jpg'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '5.5px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        with: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '& > :last-of-type': {
          mr: 2
        },
        '& > :first-of-type': {
          ml: 2
        },
        '&::-webkit-scrollbar-track': {
          mx: 2
        }
      }}>
        {/*  box column */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          // ml: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(3)})`,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }} >
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }} >Column Title </Typography>
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
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-column-dropdown'
                  }
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
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
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText> Remove this column</ListItemText>
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

          {/* box column card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} -
             ${theme.spacing(3)} -
             ${COLUMN_HEADER_HEIGHT} -
             ${COLUMN_FOOTER_HEIGHT}
            )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#bec0cdff'},
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#aaafc4ff'}
          }}
          >
            <Card sx={{
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
              <CardActions sx={{ p: '0 4px 8px 4px'}} >
                <Button size="small" startIcon={<PeopleIcon />}>20</Button>
                <Button size="small" startIcon={<ChatIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
  
  
          </Box>
  
          {/* box footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title='Drag to move' >
              <DragHandleIcon sx={{ cursor: 'pointer'}} />
            </Tooltip>
          </Box>
        </Box>
        {/*  box column */}
        <Box sx={{
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
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }} >Column Title </Typography>
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
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-column-dropdown'
                  }
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <AddCardIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
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
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText> Remove this column</ListItemText>
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
  
          {/* box column card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} -
             ${theme.spacing(3)} -
             ${COLUMN_HEADER_HEIGHT} -
             ${COLUMN_FOOTER_HEIGHT}
            )`,
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#bec0cdff'},
            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#aaafc4ff'}
          }}
          >
            <Card sx={{
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
              <CardActions sx={{ p: '0 4px 8px 4px'}} >
                <Button size="small" startIcon={<PeopleIcon />}>20</Button>
                <Button size="small" startIcon={<ChatIcon />}>15</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
  
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography >Card item</Typography>
              </CardContent>
            </Card>
  
  
          </Box>
  
          {/* box footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new Card</Button>
            <Tooltip title='Drag to move' >
              <DragHandleIcon sx={{ cursor: 'pointer'}} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
