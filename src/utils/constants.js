let apiRoot = ''

console.log('import.meta.env', import.meta.env)
console.log('import.meta.env', process.env)

if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-4crl.onrender.com'
}
export const API_ROOT = apiRoot

console.log('apiRoot', apiRoot)
// export const API_ROOT = 'http://localhost:8017'