import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentNotifications: null
}

// Các hành động gọi api (Bất đồng bộ) và cập nhật dữ liệu vào redux, dùng Middleware createAsyncThunk
// đi kèm với extraReducers

export const fetchInvitationsAPI = createAsyncThunk(
  'notifications/fetchInvitationsAPI',
  async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/invitations`)
    // lưu ý: axios sẽ trả kết quả về qua property của nó là data
    return response.data
  }
)

export const updateBoardInvitationAPI = createAsyncThunk(
  'notifications/updateBoardInvitationAPI',
  async ({ status, invitationId }) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/invitations/board/${invitationId}`, { status })
    return response.data
  }
)

// khởi tạo một slice trong kho lưu trữ - redux store
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  // Reducers: Nơi xử lý dữu liệu động bộ
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null
    },
    updateCurrentNotifications: (state, action) => {
      const incomingInvitation = action.payload
      // unshift là thêm phần tử vào đầu mảng, ngược lại với push
      state.currentNotifications.unshift(incomingInvitation)
    },
    addNotification: (state, action) => {
      const incomingInvitation = action.payload
      // unshift là thêm phần tử vào đẩu mảng, ngược lại với push
      state.currentNotifications.unshift(incomingInvitation)
    }
  },
  // ExtraReducers: xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitations = action.payload
      // Đoạn này đảo người lại mảng invitations nhận được,đơn giản là dễ hiển thị cái mới nhất lên đầu
      state.currentNotifications = Array.isArray(incomingInvitations) ? incomingInvitations.reverse() : []
    })
    builder.addCase(updateBoardInvitationAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload
      // cập nhật lại dữ liệu boardInvitation (bên trong nó sẽ có Status mới sau khi update)
      const getInvitation = state.currentNotifications.find(i => i._id === incomingInvitation._id)
      getInvitation.boardInvitation = incomingInvitation.boardInvitation
    })
  }
})

//  Action: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer
// ( chạy bất đồng bộ)

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotification
} = notificationsSlice.actions

export const selectCurrentNotifications = state => {
  return state.notifications.currentNotifications
}

export const notificationsReducer = notificationsSlice.reducer