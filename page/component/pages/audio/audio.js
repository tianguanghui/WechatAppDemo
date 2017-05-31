Page({
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.play()
  },
  data: {
    current: {
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
      name: '此时此刻',
      author: '许巍',
      src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
    audioAction: {
      method: 'pause'
    },
    slider: {
      current:0,
      min:0,
      max:0
    }
  },
  timeupdate: function(e) {
    console.log('播放进度：' + parseInt(e.detail.currentTime) + '/' + parseInt(e.detail.duration))
    var that = this;
    that.setData({
      slider: {
        current: parseInt(e.detail.currentTime),
        min: 0,
        max: parseInt(e.detail.duration)
      }
    })
  },
  sliderchange:function(e) {
    console.log('slider发生change事件，携带值为', e.detail.value)
    this.audioCtx.seek(parseInt(e.detail.value))
  }
})
