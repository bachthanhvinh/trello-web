import { createSlice } from '@reduxjs/toolkit'

// khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentActiveCard: null
}

// khởi tạo một slide trong kho lưu trữ - redx store

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  // reducers: sử lý dữ liệu đồng bộ
  reducers: {
    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload // action.payload là chuẩn đặt tên nhận dữ liệu và reducer, ở
      // đây chúng ta gán nó ra một biến có nghĩa hơn
      // xử lý dữ liệu nếu cần thiệt
      //....
      // Update lại dữ liệu currentActiveCard trong redux
      state.currentActiveCard = fullCard
    }
  },
  // ExtraReducers: Xử lý dữ liệu bất đồng bộ
  extraReducers: (build) => {}
})

export const { clearCurrentActiveCard, updateCurrentActiveCard } = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const activeCardReducer = activeCardSlice.reducer