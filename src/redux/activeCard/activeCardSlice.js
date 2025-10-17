import { createSlice } from '@reduxjs/toolkit'

// khởi tạo giá trị của một Slice trong redux
const initialState = {
  currentActiveCard: null,
  isShowModalActiveCard: false
}

// khởi tạo một slide trong kho lưu trữ - redx store

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,

  // reducers: sử lý dữ liệu đồng bộ
  reducers: {

    showModalActiveCard: (state) => {
      state.isShowModalActiveCard = true
    },

    clearAndHideCurrentActiveCard: (state) => {
      state.currentActiveCard = null,
      state.isShowModalActiveCard = false
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

export const {
  clearAndHideCurrentActiveCard,
  updateCurrentActiveCard,
  showModalActiveCard
} = activeCardSlice.actions

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard
}

export const selectIsShowModalActiveCard = (state) => {
  return state.activeCard.isShowModalActiveCard
}

export const activeCardReducer = activeCardSlice.reducer