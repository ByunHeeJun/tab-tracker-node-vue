/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
const {
  sequelize,
  Song,
  User,
  Bookmark } = require('../src/models')

const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')

console.log(songs)
console.log(users)
sequelize.sync({ force: true }) // { force: true } 데이터 베이스 초기화
  .then(async function () {
    await Promise.all(
      users.map(user => {
        const userList = User.create(user)
        console.log('userList', userList)
      })
    )

    await Promise.all(
      songs.map(song => {
        Song.create(song)
      })
    )
    
    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
  })
