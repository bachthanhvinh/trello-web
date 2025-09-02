import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardDetailsApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsApi = async (boardId, updateColumn) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateColumn)
  return response.data
}


export const createColumnApi = async (newColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn)
  return response.data
}
export const updateColumnDetailsApi = async (columnId, newCard) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, newCard)
  return response.data
}

export const createCardApi = async (newCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
  return response.data
}