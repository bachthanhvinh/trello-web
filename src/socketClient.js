// Cấu hình socket-io pphias client tại đây và export ra biến socketIoInstance
import { io } from 'socket.io-client'
import { API_ROOT } from './utils/constants'
export const socketIoInstance = io(API_ROOT)