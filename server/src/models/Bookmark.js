/* eslint-disable no-unreachable */
/* eslint-disable no-useless-return */
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {})
  Bookmark.assoicate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Song)
  }
  return Bookmark
}
