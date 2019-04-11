const AuthenticationController = require('./controller/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controller/SongsController')
const BookmarkController = require('./controller/BookmarkController')

module.exports = function (app) {
  app.post('/register',
    AuthenticationControllerPolicy.register, // 지정해주는 register들의 순서도 중요하다 순서가 반대면 형식 유효성검사를 하지 않는다.
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login
  )

  app.get('/songs',
    SongsController.index)

  app.post('/songs',
    SongsController.post)

  app.get('/songs/:songId',
    SongsController.show)

  app.put('/songs/:songId',
    SongsController.put)

  app.get('/bookmarks',
    BookmarkController.index)
}
