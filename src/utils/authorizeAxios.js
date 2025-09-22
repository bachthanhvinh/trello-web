import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

const authorizeAxiosInstance = axios.create()

// thời gian cho tối đa của 1 reqquest để 10 phút
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ việc chúng ta sẽ lưu)
// JWT tokent (refresh & access) vào trong httpOnly Coolkie của trình duyệt)
authorizeAxiosInstance.defaults.withCredentials = true

// Cấu hình Interceptors (bộ đánh chặn vào giữa mọi Request & Response)

// interceptor Request: Can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.request.use( (config) => {
  // Do something before request is sent
  interceptorLoadingElements(true)

  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
}

)

// interceptor Response: Can thiệp vào giữa những cái request API
authorizeAxiosInstance.interceptors.response.use( (response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error và rơi vào đây

  interceptorLoadingElements(false)

  // Xử lý tập trung phần hiển thị thông báo lỗi trả vè từ mội api ở đây (Viết code một lần: clean code)
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  // dùng toastify để hiện thị bất kỳ mọi mã lỗi lên màn hình - ngoài trừ mã 410 - GONE phục vụ việc tự
  //  động refresh lại token.
  if (error.response?.statusv !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizeAxiosInstance