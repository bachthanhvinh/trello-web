import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

/**
 * không thể import { store } theo cách thông thường.
 * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi componnet
 * như file authorizeAxios hiện tại
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */

let axiosReduxStore
export const InjectStore = mainStore => { axiosReduxStore = mainStore }

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

// khởi tạo một cái promise cho việc gọi api refresh_token
// Mục địch tạo promise này để khi nào gọi api refresh_token xong xuoi thì mới retry lại nhiều api bị lỗi trước đó
let refreshTokenPromise = null

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

  /** Quan trọng: Xử lý Refresh Token tự động */
  // trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }
  // trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gửi api refresh toke để làm  mới lại accessToken
  // Đầu tiền lấy được các request API đã bị lỗi thông qua error.config
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    // Gán thêm một cái giá trị _retry luôn  = true trong khoảng thời gian chờ, đảm bảo việc refresh token này
    // chỉ luôn gọi 1 lần tại 1 thời điểm ( nhìn lại điều kiện if ngay phía trên)
    originalRequests._retry = true

    // kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_Tokne đồng thời
    // gán vào cho cái refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then( data => {
          // Đồng thời accessToken đã nằm trong httpOnly cookie (xử lý từ phía BE)
          return data?.accessToken
        })
        .catch((_error) => {
          // Nếu nhận bất kỳ lỗi nào từ api refresh token thì cứ logout luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù API có thành công hay lỗi thì vẫn luôn gán lại cái refreshTokenPromise về null như ban đầu
          refreshTokenPromise = null
        })
    }

    // Cần return trường hợp hợp refreshTokenPromise chạy thành công và xử lý ở đây:
    return refreshTokenPromise.then(accessToken => {
      /**
       * Bước 1: Đối với Trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây
       * Hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE)
       * sau khi api refresh Token được gọi thành công
       */

      // Bước 2: Bước quan trọng: return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại nhứng api ban dầu bị lỗi
      return authorizeAxiosInstance(originalRequests)
    })
  }

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