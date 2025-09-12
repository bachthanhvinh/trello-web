let apiRoot = ''

// console.log('import.meta.env', import.meta.env)
// console.log('import.meta.env', process.env)
// Nếu là local dev thì sẽ chạy vào phần local
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
// Nếu là production thì sẽ chạy vào đây
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-4crl.onrender.com'
}
export const API_ROOT = apiRoot

// console.log('apiRoot', apiRoot)
// export const API_ROOT = 'http://localhost:8017'