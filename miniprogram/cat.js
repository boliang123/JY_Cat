// 放置与cat对象有关的函数
const utils = require('./utils.js');
<<<<<<< HEAD
=======
const cache = require('./cache.js');
>>>>>>> 61d770c (公告版本)

// 常用的一些对象
const db = wx.cloud.database();
const coll_photo = db.collection('photo');
<<<<<<< HEAD

// 获取猫猫的封面图
// TODO(zing): 可以搞个缓存
=======
const coll_cat = db.collection('cat');

// 获取猫猫的封面图
>>>>>>> 61d770c (公告版本)
async function getAvatar(cat_id, total) {
  if (!total || total === 0) {
    return undefined;
  }
<<<<<<< HEAD
=======

  var cacheKey = `cat-avatar-${cat_id}`;
  var cacheItem = cache.getCacheItem(cacheKey);
  console.log(cacheKey, cacheItem);
  if (cacheItem) {
    return cacheItem;
  }
>>>>>>> 61d770c (公告版本)
  
  // photo_id : 不以 HEIC 为文件后缀的字符串
  const qf = {
    cat_id: cat_id,
    verified: true,
    best: true,
    photo_id: /^((?!\.heic$).)*$/i
  };

  // TODO: 这里对于API调用的次数较多，需要修改
  var index = utils.randomInt(0, total);
  var pho_src = (await coll_photo.where(qf).skip(index).limit(1).get()).data;
<<<<<<< HEAD
  return pho_src[0];
=======
  cacheItem = pho_src[0];
  
  cache.setCacheItem(cacheKey, cacheItem, 24);
  return cacheItem;
>>>>>>> 61d770c (公告版本)
}

// 消除“有新相片”提示
function getVisitedDate(cat_id) {
  const key = "visit-cat-" + cat_id;
<<<<<<< HEAD
  return new Date(wx.getStorageSync(key));
}
function setVisitedDate(cat_id) {
  const key = "visit-cat-" + cat_id;
  wx.setStorageSync(key, new Date());
=======
  return cache.getCacheDate(key);
}
function setVisitedDate(cat_id) {
  const key = "visit-cat-" + cat_id;
  cache.setCacheDate(key);
  return;
}

// 获取猫猫信息
async function getCatItem(cat_id) {
  if (!cat_id) {
    return undefined;
  }
  var cacheKey = `cat-item-${cat_id}`;
  var cacheItem = cache.getCacheItem(cacheKey);
  if (cacheItem) {
    return cacheItem;
  }

  cacheItem = (await coll_cat.doc(cat_id).get()).data;
  cache.setCacheItem(cacheKey, cacheItem, 24);
  return cacheItem;
>>>>>>> 61d770c (公告版本)
}

export {
  getAvatar,
  getVisitedDate,
  setVisitedDate,
<<<<<<< HEAD
=======
  getCatItem,
>>>>>>> 61d770c (公告版本)
}