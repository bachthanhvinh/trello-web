import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


// khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)

    return response.data
  }
)

// Khởi tạo một cái Slice trong kho lưu trữ Redux
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý dữ liệu động bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      const user = action.payload

      state.currentUser= user
    })
  }
})

// export const {} = userSlice.actions

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer