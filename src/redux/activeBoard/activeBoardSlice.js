import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'

// khởi tạo giá trị State của một cái Slice trong redux
const initialState = {
  currentActiveBoard: null
}

// Các hành động gọi api (bất động bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk
// đi kèm với extraReducers
// https://redux-toolkit.js.org/api/createAsyncThunk

export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsApi',
  async (boardId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)

    return response.data
  }
)

// Khởi tạo một cái Slice trong kho lưu trữ Redux
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers: Nơi xử lý dữ liệu động bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      // action.payload là chuẩn đặt tên nhận dữ liệu reducer, ở đây chúng ta găn nó ra một biến có nghĩa hơn
      const board = action.payload

      // xử lý dữ liệu nếu cần thiết...
      //..

      // Update lại dữ liệu của cái currenActiveBoard
      state.currentActiveBoard = board
    },
    updateCardInBoard: (state, action) => {
      // update nested data
      const incomingCard = action.payload

      // Tìm dần từ board > column > card
      const column = state.currentActiveBoard.columns.find(i => i._id === incomingCard.columnId)
      if (column) {
        const card = column.cards.find(i => i._id === incomingCard._id)
        if (card) {
          /**
           * giải thích đoạn này là cần là thay vì sử dụng phải tên tay từng trường một khi cần update
           * ta chỉ cần dùng Object.keys để lấy toàn bộ key của incomingCard sau khi lấy key thì
           * dùng forEach lặp qua key đó vào gán vào card[Key] = incomingCard[Key]
           */
          Object.keys(incomingCard).forEach(key => {
            card[key] = incomingCard[key]
          })
        }
      }
    }

  },
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là cái response.data trả về ở trên
      let board = action.payload

      // thành viên trong cái board sẽ là gộp lại của 2 mảng owners và members
      board.FE_allUsers = board.owners.concat(board.members)

      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }
      })

      // Update lại dữ liệu của cái currenActiveBoard
      state.currentActiveBoard = board
    })
  }
})

// Action creators are generated for each case reducer function
// Action: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu
// thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer.
export const { updateCurrentActiveBoard, updateCardInBoard } = activeBoardSlice.actions

// Selectors: là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong
// kho redux store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

// cái file này tên là activeBoardSlide Nhưng chúng ta sẽ export một thứ tên là Reducer
// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer