/* eslint-disable no-undef */
import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  }
}

// AuthenticationService.register({
//   email: 'hejeun22@naver.com',
//   password: '1234'
// })
