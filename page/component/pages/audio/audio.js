Page({
  data: {
    current: {
      // poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      // name: '第一首歌曲',
      // author: '歌手一',
      //src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
      poster:'',
      name:'',
      author:'',
      src: '',
    },
    slider: {
      current:0,
      min:0,
      max:0,
      progress_tip: ''
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    wx.request({
      url: 'http://ios.yatibang.com/api/AppLite/getAudio.php',
      data:{

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('请求成功')
        console.log(res.data)
        that.setData({
          current: {
            poster: res.data.data.song.poster,
            name: res.data.data.song.name,
            author: res.data.data.song.author,
            src: res.data.data.song.src,
          }
        })
      },
      fail:function () {
        console.log('请求失败')
      },
      complete:function () {
        console.log('请求完成')
      }
    })
  },
  onReady: function () {
    console.log('onReady')
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },
  onShow: function () {
    console.log('onShow')
  },
  onHide: function () {
    console.log('onHide')
  },
  onUnload: function () {
    console.log('onUnload')
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },
  onReachBottom: function () {
    console.log('onReachBottom')
  },
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
    return {
      title: '鸭题榜FM首页',
      path: '/pages/index/index'
    }
  },
  timeupdate: function(e) {
    console.log('播放进度：' + parseInt(e.detail.currentTime) + '/' + parseInt(e.detail.duration))
    var that = this
    var tip = that.formatProgressTip(e.detail.currentTime, e.detail.duration)
    that.setData({
      slider: {
        current: parseInt(e.detail.currentTime),
        min: 0,
        max: parseInt(e.detail.duration),
        progress_tip: tip,
      }
    })
  },
  formatProgressTip: function (currentTime,duration) {
    console.log('调用格式化方法')
    var currentMinite = ''
    var currentSecond = ''
    var totalMinite = ''
    var totalSecond = ''
    if (parseInt((parseInt(currentTime) / 60)) < 10) {
      currentMinite = '0' + parseInt((parseInt(currentTime) / 60))
    } else {
      currentMinite = parseInt((parseInt(currentTime) / 60))
    }
    if (parseInt((parseInt(currentTime) % 60)) < 10) {
      currentSecond = '0' + parseInt((parseInt(currentTime) % 60))
    } else {
      currentSecond = parseInt((parseInt(currentTime) % 60))
    }
    if (parseInt((parseInt(duration) / 60)) < 10) {
      totalMinite = '0' + parseInt((parseInt(duration) / 60))
    } else {
      totalMinite = parseInt((parseInt(duration) / 60))
    }
    if (parseInt((parseInt(duration) % 60)) < 10) {
      totalSecond = '0' + parseInt((parseInt(duration) % 60))
    } else {
      totalSecond = parseInt((parseInt(duration) % 60))
    }
    return currentMinite + ':' + currentSecond + '/' + totalMinite + ':' + totalSecond
  },
  finished: function() {
    console.log('播放完成，自动播放下一首歌曲')
    var that = this
    wx.request({
      url: 'http://ios.yatibang.com/api/AppLite/getAudio.php',
      data: {
        index:'',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('请求成功')
        console.log(res.data)
        that.setData({
          current: {
            poster: res.data.data.song.poster,
            name: res.data.data.song.name,
            author: res.data.data.song.author,
            src: res.data.data.song.src,
          }
        })
        that.audioCtx.setSrc(res.data.data.song.src)
        that.audioCtx.play()
      },
      fail: function () {
        console.log('请求失败')
      },
      complete: function () {
        console.log('请求完成')
      }
    })
  },
  sliderchange:function(e) {
    console.log('slider发生change事件，携带值为', e.detail.value)
    this.audioCtx.seek(parseInt(e.detail.value))
  }
})
