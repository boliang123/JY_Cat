
// 使用openid来读取用户信息
async function getCatCommentCount(cat_id) {
  if (cat_id === undefined) {
    return 0;
  }
  const db = wx.cloud.database();
<<<<<<< HEAD
  const coll_comment = db.collection('comment');
  return (await coll_comment.where({cat_id: cat_id}).count()).total;
=======
  const _ = db.command;
  const coll_comment = db.collection('comment');
  return (await coll_comment.where({
    cat_id: cat_id, 
    deleted: _.neq(true)
  }).count()).total;
>>>>>>> 61d770c (公告版本)
}

module.exports = {
  getCatCommentCount,
<<<<<<< HEAD
} 
=======
}
>>>>>>> 61d770c (公告版本)
