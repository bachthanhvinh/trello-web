import { toast } from 'react-toastify'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// export const fetchBoardDetailsApi = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

export const updateBoardDetailsApi = async (boardId, updateColumn) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateColumn)
  return response.data
}


export const MoveCardToDifferentColumnsApi = async (updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}


export const createColumnApi = async (newColumn) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumn)
  return response.data
}
export const updateColumnDetailsApi = async (columnId, newCard) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, newCard)
  return response.data
}
export const deleteColumnAndCardApi = async (columnId) => {
  const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

export const createCardApi = async (newCard) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCard)
  return response.data
}

//  Users
export const registerUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  toast.success('Account created successfully! Please check and verify your account before logging in!',
    { theme: 'colored' })
  return response.data
}
export const verifyUserAPI = async (data) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verifyed successfully! New you can login to enjoy our services! Have a good day!',
    { theme: 'colored' })
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${searchPath}`)
  return response.data
}

export const createNewBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards`, data)
  toast.success('Board created successfuly')
  return response.data
}

export const updateCardDetailsAPI = async (cardId, updateData) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
  return response.data
}

export const InviteUserToBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/invitations/board`, data)
  toast.success('User invited to board successfully')
  return response.data
}

