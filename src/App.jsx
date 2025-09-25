import Board from '~/pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import AccountVerification from './pages/Auth/AccountVerification'
function App() {
  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        // ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Brower
        <Navigate to='/boards/68c19236c00be1c92fe3ab14' replace={true} />
      } />
      {/* Board Detail */}
      <Route path='/boards/:boardId' element={<Board />}/>

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
