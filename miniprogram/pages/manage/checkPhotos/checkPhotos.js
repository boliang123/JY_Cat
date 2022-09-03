// 审核照片
const utils = require('../../../utils.js');
<<<<<<< HEAD
const regeneratorRuntime = utils.regeneratorRuntime;
const randomInt = utils.regeneratorRuntime;
=======
>>>>>>> 61d770c (公告版本)
const isManager = utils.isManager;

const msg = require('../../../msg.js');
const requestNotice = msg.requestNotice;
const sendVerifyNotice = msg.sendVerifyNotice;
// const verifyTplId = msg.verifyTplId;

const config = require('../../../config.js');
const notifyVerifyPhotoTplId = config.msg.notifyVerify.id;
<<<<<<< HEAD
=======

const cache = require('../../../cache.js');

>>>>>>> 61d770c (公告版本)
const text_cfg = config.text;

// 准备发送通知的列表，姓名：审核详情
var notice_list = {};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipText: '正在鉴权...',
    tipBtn: false,
    total: '-',
<<<<<<< HEAD
=======
    campus_list: [],
>>>>>>> 61d770c (公告版本)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    notice_list = {};
    this.checkAuth();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面退出');

<<<<<<< HEAD
    // 自动数猫图
    wx.cloud.callFunction({
      name: "countPhoto",
      success: (res) => {
        console.log('数猫图完成', res.result);
      }
    });

    // 后台处理缩略图和水印图
    wx.cloud.callFunction({
      name: "imProcess",
      data: {
        app_name: text_cfg.app_name
      },
      success: (res) => {
        console.log('图片处理完成', res.result);
      }
    });

    // 发送审核消息
    sendVerifyNotice(notice_list);

    // 重新计算拍照月榜
    wx.cloud.callFunction({
      name: "getPhotoRank",
      success: (res) => {
        console.log('拍照月榜完成', res.result);
      }
    });
=======
    // 发送审核消息
    sendVerifyNotice(notice_list);
>>>>>>> 61d770c (公告版本)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 没有权限，返回上一页
  goBack() {
    wx.navigateBack();
  },
  // 检查权限
  checkAuth() {
    const that = this;
    isManager(function (res) {
      if (res) {
        that.setData({
          auth: true
        });
<<<<<<< HEAD
        that.reload();
=======
        that.loadAllPhotos();
>>>>>>> 61d770c (公告版本)
      } else {
        that.setData({
          tipText: '只有管理员Level-1能进入嗷',
          tipBtn: true,
        });
        console.log("Not a manager.");
      }
    }, 1)
  },
<<<<<<< HEAD
  async loadPhotos() {
    const db = wx.cloud.database();
    var photos = (await db.collection('photo').where({
      verified: false
    }).get()).data;
    for (var ph of photos) {
      var cat = (await db.collection('cat').doc(ph.cat_id).get()).data;
      ph.cat = cat
    }
    console.log(photos);
    this.setData({
      photos: photos
    });
    return true;
  },

  reload() {
    this.requestSubscribeMessage() //判断是否弹出订阅消息设置
    wx.showLoading({
      title: '加载中...',
    });
    const that = this;
    const db = wx.cloud.database();
    db.collection('photo').where({
      verified: false
    }).count().then(res => {
      console.log(res);
      that.setData({
        total: res.total
      });
      that.loadPhotos().then(() => {
        wx.hideLoading();
      });

=======

  async loadAllPhotos() {
    wx.showLoading({
      title: '加载中...',
    });
    const db = wx.cloud.database();
    // 获取所有照片
    var total_count = (await db.collection('photo').where({
      verified: false
    }).count()).total;

    var pools = [];
    for (var i=0; i<total_count; i+=20) {
      pools.push(db.collection("photo").where({verified: false}).skip(i).limit(20).get());
    }

    var photos = await Promise.all(pools);
    // 拼接多个array
    photos = photos.map(x => x.data);
    photos = Array.prototype.concat.apply([], photos);

    var campus_list = {};
    for (var photo of photos) {
      var cache_key = `cat-${photo.cat_id}`;
      var cat = cache.getCacheItem(cache_key);
      if (!cat) {
        var cat = (await db.collection('cat').doc(photo.cat_id).get()).data;
        cache.setCacheItem(cache_key, cat, 3);
      }
      photo.cat = cat;

      // 分类记录到campus里
      var campus = cat.campus;
      if (!campus_list[campus]) {
        campus_list[campus] = [];
      }
      console.log(campus, photo);
      campus_list[campus].push(photo);
    }
    
    // 恢复最后一次审批的校区
    var cache_active_campus = cache.getCacheItem("checkPhotoCampus");
    if (!cache_active_campus || !campus_list[cache_active_campus]) {
      cache_active_campus = undefined
    }
    
    this.setData({
      campus_list: campus_list,
      active_campus: cache_active_campus,
    })
    
    wx.hideLoading();
  },

  bindClickCampus(e) {
    var campus = e.currentTarget.dataset.key;
    var active_campus = this.data.active_campus;
    console.log(campus);

    if (active_campus == campus) {
      return;
    }
    
    this.setData({
      active_campus: campus
>>>>>>> 61d770c (公告版本)
    });
  },

  async requestSubscribeMessage() {
<<<<<<< HEAD
    // if (this.data.total <= 2) { //最多剩余几张照片可更新订阅状态，TODO:待更改
    if (this.data.total >= 0) { 
      wx.getSetting({
        withSubscriptions: true,
        success: res => {
          console.log("subscribeSet:", res);
          if ('subscriptionsSetting' in res) {
            if (!(notifyVerifyPhotoTplId in res['subscriptionsSetting'])) {
              // 第一次申请或只点了取消，未永久拒绝也未允许
              requestNotice('notifyVerify');
              // console.log("firstRequest");
            } else if (res.subscriptionsSetting[notifyVerifyPhotoTplId] === 'reject') {
              // console.log("已拒绝");// 不再请求/重复弹出toast
            } else if (res.subscriptionsSetting[notifyVerifyPhotoTplId] === 'accept') {
              console.log('重新请求下个一次性订阅');
              requestNotice('notifyVerify');
            }
          }
        }
      })
      // if(subscribeSetting['mainSwitch']){} //本小程序订阅消息总开关
    }
  },
  bindCheck(e) {
    const photo = e.currentTarget.dataset.photo;
    const best = e.currentTarget.dataset.best;
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定通过审核' + (best ? '+精选' : '') + '？',
      success(res) {
        if (res.confirm) {
          console.log('开始通过');
          wx.cloud.callFunction({
            name: "managePhoto",
            data: {
              type: "check",
              photo: photo,
              best: best
            }
          }).then(res => {
            console.log("审核通过：" + photo._id);
            console.log(res.data);
            // 内存记录一下这个操作，用来发通知
            that.addNotice(photo, true);

            // 直接从列表里去掉这只猫，不完全加载了
            const photos = that.data.photos;
            const new_photos = photos.filter((ph, index, arr) => {
              // 这个photo是用户点击的photo，在上面定义的
              return ph._id != photo._id;
            });
            that.setData({
              photos: new_photos,
              total: that.data.total - 1
            }, () => {
              wx.showToast({
                title: '审核通过',
              });
            });

          })
        }
=======
    wx.getSetting({
      withSubscriptions: true,
      success: res => {
        console.log("subscribeSet:", res);
        if ('subscriptionsSetting' in res) {
          if (!(notifyVerifyPhotoTplId in res['subscriptionsSetting'])) {
            // 第一次申请或只点了取消，未永久拒绝也未允许
            requestNotice('notifyVerify');
            // console.log("firstRequest");
          } else if (res.subscriptionsSetting[notifyVerifyPhotoTplId] === 'reject') {
            // console.log("已拒绝");// 不再请求/重复弹出toast
          } else if (res.subscriptionsSetting[notifyVerifyPhotoTplId] === 'accept') {
            console.log('重新请求下个一次性订阅');
            requestNotice('notifyVerify');
          }
        }
>>>>>>> 61d770c (公告版本)
      }
    })
  },

<<<<<<< HEAD
  bindDelete(e) {
    const photo = e.currentTarget.dataset.photo;
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success(res) {
        if (res.confirm) {
          console.log('开始删除');
          wx.cloud.callFunction({
            name: "managePhoto",
            data: {
              type: "delete",
              photo: photo
            }
          }).then(res => {
            console.log("删除照片记录：" + photo._id);
            // 内存记录一下这个操作，用来发通知
            that.addNotice(photo, false);

            // 直接从列表里去掉这只猫，不完全加载了
            const photos = that.data.photos;
            const new_photos = photos.filter((ph, index, arr) => {
              // 这个photo是用户点击的photo，在上面定义的
              return ph._id != photo._id;
            });
            that.setData({
              photos: new_photos,
              total: that.data.total - 1
            }, () => {
              wx.showToast({
                title: '删除成功',
              });
            });
          })
        }
      }
    })
  },
=======
>>>>>>> 61d770c (公告版本)
  openBigPhoto(e) {
    const pid = e.currentTarget.dataset.pid;
    wx.previewImage({
      urls: [pid]
    });
  },

  // 添加一条通知记录，等页面退出的时候统一发送通知
  addNotice(photo, accepted) {
    const openid = photo._openid;
    if (!notice_list[openid]) {
      notice_list[openid] = {
        accepted: 0,
        deleted: 0,
      }
    }
    if (accepted) {
      notice_list[openid].accepted++;
    } else {
      notice_list[openid].deleted++;
    }
  },

  // 点击所属猫猫名称，可以跳转到猫猫详情
  toCatDetail(e) {
    const cat_id = e.currentTarget.dataset.cat_id;
    wx.navigateTo({
      url: '/pages/genealogy/detailCat/detailCat?cat_id=' + cat_id,
    })
  },
<<<<<<< HEAD
=======

  // 标记照片
  bindMark(e) {
    const index = e.currentTarget.dataset.index;
    var mark_type = e.currentTarget.dataset.type;
    var active_campus = this.data.active_campus;
    var photos = this.data.campus_list[active_campus];

    if (photos[index].mark == mark_type) {
      mark_type = "";  // 反选
    }
    this.setData({
      [`campus_list.${active_campus}[${index}].mark`]: mark_type
    });
  },

  // 确定处理
  bindCheckMulti(e) {
    var active_campus = this.data.active_campus;
    var photos = this.data.campus_list[active_campus];
    var nums = {}, total_num = 0;
    for (const photo of photos) {
      if (!photo.mark || photo.mark == "") {
        continue;
      }
      if (!(photo.mark in nums)) {
        nums[photo.mark] = 0;
      }
      nums[photo.mark] ++;
      total_num ++;
    }

    if (total_num == 0) {
      return false;
    }
    
    var that = this;
    wx.showModal({
      title: '确定批量审核？',
      content: `删除${nums['delete'] || 0}张，通过${nums['pass'] || 0}张，精选${nums['best'] || 0}张`,
      success(res) {
        if (res.confirm) {
          console.log('开始通过');
          that.doCheckMulti();
        }
      }
    });

    // 记录一下最后一次审批的cache
    cache.setCacheItem("checkPhotoCampus", active_campus, 24*7*31);
  },

  // 开始批量处理
  doCheckMulti() {
    var that = this;
    wx.showLoading({
      title: '处理中...',
    })
    var active_campus = this.data.active_campus;
    var photos = this.data.campus_list[active_campus];
    const mask2type = {
      "delete": "delete",
      "pass": "check",
      "best": "check",
    }
    var all_queries = [], new_photos = [];
    for (const photo of photos) {
      if (!photo.mark || photo.mark == "") {
        new_photos.push(photo);
        continue;
      }

      // 准备数据
      var data = {
        type: mask2type[photo.mark],
        photo: photo,
        best: photo.mark == "best",
      }

      all_queries.push(wx.cloud.callFunction({
        name: "managePhoto",
        data: data
      }))
      that.addNotice(photo, (photo.mark != "delete"));
    }
    // 阻塞一下
    Promise.all(all_queries).then(_ => {
      that.setData({
        [`campus_list.${active_campus}`]: new_photos,
      }, () => {
        wx.showToast({
          title: '审核通过',
        });
      });
    });
  },
>>>>>>> 61d770c (公告版本)
})