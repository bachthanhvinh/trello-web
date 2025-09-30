import Board from '~/pages/Boards/_id'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from './redux/user/userSlice'

/**
 * Giải pháp Clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập
 * Sử dụng <Outlet /> của react-router-dom để hiển thị các child Route (xem cách sử dụng trong App() bên dưới)
 */
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        // ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Brower
        <Navigate to='/boards/68c19236c00be1c92fe3ab14' replace={true} />
      } />
      {/* Protected Routes Hiểu đơn giản trong dự án của là những route chỉ cho truy cập sau khi
      đã login */}
      <Route element={ <ProtectedRoute user={currentUser} /> }>
        {/* <Outlet/> là của react-router-dom sẽ chạy vào các child route trong này */}

        {/* Board Detail */}
        <Route path='/boards/:boardId' element={<Board />}/>
      </Route>

      {/* Authentication */}
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth/>}/>
      <Route path='/account/verification' element={<AccountVerification />}/>

      {/* 404 not found page */}
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}
export default App
