//index.js

// wx.getSystemInfo({
//   success: function (data) {
//     wx.showModal({
//       title: '版本',
//       content: JSON.stringify(data),
//     })
//   }
// });


// 画图组件
// var chars = require("../../utils/chars.js");
// new chars({
//   canvasId: 'acanvas',
//   type: 'line',
//   categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
//   series: [{
//     name: '成交量1',
//     data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8],
//     format: function (val) {
//       return val.toFixed(2) + '万';
//     }
//   }, {
//     name: '成交量2',
//     data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94],
//     format: function (val) {
//       return val.toFixed(2) + '万';
//     }
//   }],
//   yAxis: {
//     title: '成交金额 (万元)',
//     format: function (val) {
//       return val.toFixed(2);
//     },
//     min: 0
//   },
//   width: 640,
//   height: 400
// });



//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '唐老师是猪？？',
    userInfo: {},
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    objectArray: [
      { id: 1, unique: 'unique_1' },
      { id: 0, unique: 'unique_0' },
    ],
    numberArray: [1, 2],
    canIUse: wx.canIUse('button.open-type.contact'),
    items:"2014-01",
    items2:"",
    canvasW:"750px",
    canvasL:20
  },
  ceshiFN:function(){
    var that = this;
    if (wx.canIUse("getSetting")){
      wx.getSetting({
        success(res) {
          console.log(res);
          if (wx.canIUse("openSetting")) {

            if (!res.authSetting["scope.userInfo"]){
              wx.openSetting({
                success: function (data) {
                  console.log(data)

                  if (data.authSetting["scope.userInfo"]){
                    app.getUserInfo(function (userInfo) {
                      console.log(userInfo)
                      //更新数据
                      that.setData({
                        userInfo: userInfo
                      })
                    })
                  }
                  
                }
              })
            }

            // wx.authorize({
            //   scope: 'scope.userInfo',
            //   success() {
            //     wx.getUserInfo()
            //   }
            // })
          } else {
            wx.showModal({
              title: '提提提醒',
              content: '不能openSetting',
            })
          }

          // if (wx.canIUse("authorize")) {
            

          //   if (!res.authSetting["scope.userInfo"]) {
          //     wx.authorize({
          //       scope: 'scope.userInfo',
          //       success: function (data) {
          //         console.log(data)
          //         wx.getUserInfo();
          //         // if (data.authSetting["scope.userInfo"]) {
          //         //   app.getUserInfo(function (userInfo) {
          //         //     console.log(userInfo)
          //         //     //更新数据
          //         //     that.setData({
          //         //       userInfo: userInfo
          //         //     })
          //         //   })
          //         // }

          //       }
          //     })
          //   }

          //   // wx.authorize({
          //   //   scope: 'scope.userInfo',
          //   //   success() {
          //   //     wx.getUserInfo()
          //   //   }
          //   // })
          // } else {
          //   wx.showModal({
          //     title: '提提提醒',
          //     content: '不能authorize',
          //   })
          // }

        }
      })
    }else{
      wx.showModal({
        title: '提醒',
        content: '你的微信版本过低，不能getSetting',
      })
    }
  },
  changeTime:function(e){
    console.log(e);
    this.setData({items:e.detail.value})
  },
  changeTime2: function (e) {
    console.log(e);
    this.setData({ items2: e.detail.value })
  },
  switch: function (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront: function (e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C'],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    const length = this.data.objectArray.length
    this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront: function (e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(wx.canIUse("openSetting"));
    

    drawCanvas({
      id: "firstCanvas",
      box: [
        { x: 30, y: 22 },
        { x: 60, y: 98 },
        { x: 80, y: 48 },
        { x: 100, y: 55 },
        { x: 140, y: 95 },
        { x: 170, y: 75 },
        { x: 190, y: 144 },
        { x: 250, y: 105 },
        { x: 300, y: 95 },
        { x: 350, y: 75 },
        { x: 400, y: 144 },
        { x: 500, y: 105 },
        { x: 580, y: 95 },
        { x: 600, y: 75 },
        { x: 650, y: 180},
        { x: -10, y: 180 },
      ],
      lineWidth: 2,
      strokeStyle:"red",
      r:4,
      fillStyle:"blue"
    })
    // 设置描边颜色
    // context.setStrokeStyle("#7cb5ec");
    // // 设置线宽
    // context.setLineWidth(4);

    // context.moveTo(50, 70);
    // context.lineTo(150, 150);
    // context.lineTo(250, 30);
    // context.lineTo(350, 120);
    // context.lineTo(450, 150);
    // context.lineTo(550, 95);
    // // 对当前路径进行描边
    // context.stroke();
    // wx.drawCanvas({
    //   canvasId: 'firstCanvas',
    //   actions: context.getActions()
    // });

    // context.beginPath();
    // // 设置描边颜色
    // context.setStrokeStyle("#ffffff");
    // // 设置填充颜色
    // context.setFillStyle("#7cb5ec");
    // context.moveTo(50, 70);
    // // 绘制圆形区域
    // context.arc(50, 70, 8, 0, 2 * Math.PI, false);

    // context.moveTo(150, 150);
    // context.arc(150, 150, 8, 0, 2 * Math.PI, false);

    // context.closePath();
    // // 填充路径
    // context.fill();
    // context.stroke();


    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })

    

    // wx.showModal({
    //   title: '提示',
    //   content: '这是提示内容。',
    //   success:function(res){
    //     console.log(res)
    //   }
    // })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  zhuanfa:function(){
    console.log("拥有了转发功能")
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  handleScroll:function(e){
    console.log(e);
    this.setData({})
  }
})

function drawCanvas(config){
  var ctx = wx.createCanvasContext(config.id);
  var padding = 50;
  var xstandard = 50;
  var ystandard = 30;
  // 排序
  config.box.sort(function(a,b){
    return a.x - b.x
  })
  // 画线
  ctx.moveTo(config.box[0].x + padding, 200 - config.box[0].y - padding);
  for(var i = 1;i<config.box.length;i++){
    ctx.lineTo(config.box[i].x + padding, 200 - config.box[i].y - padding);
  }
  ctx.setLineWidth(config.lineWidth);
  ctx.setStrokeStyle(config.strokeStyle);
  ctx.stroke();
  // 描点
  for(var i = 0;i<config.box.length;i++){
    ctx.beginPath();
    ctx.arc(config.box[i].x + padding, 200 - config.box[i].y - padding,config.r,0,Math.PI*2);
    ctx.setFillStyle(config.fillStyle);
    ctx.fill();
  }
  // 清除超出部分
  ctx.clearRect(0,0,padding,200);
  ctx.clearRect(padding,200-padding,750,padding);
  // 坐标
  ctx.beginPath();
  ctx.moveTo(0, 200 - padding);
  ctx.lineTo(750, 200 - padding);
  ctx.moveTo(padding, 200 - padding);
  ctx.lineTo(padding,0);
  ctx.setStrokeStyle("#c4c4c4");
  ctx.setLineWidth(1);
  ctx.stroke();

  // 刻度
  ctx.beginPath();
  ctx.setFontSize(14);
  var xlength = Math.ceil(750 / xstandard) - 1;
  var ylength = Math.ceil((200 - ystandard) / ystandard) - 1;
  ctx.setTextAlign("center");
  ctx.setFillStyle("#acacac");
  for (var i = 1; i < xlength;i++){
    ctx.fillText(i, i * xstandard + padding, 220 - padding);
  }
  for (var i = 1; i < ylength; i++){
    ctx.fillText( i*40, padding-30, (ylength - i)*ystandard );
  }

  // 警戒线
  ctx.beginPath();
  ctx.setLineWidth(1);
  ctx.setStrokeStyle("#000000");
  for(var i=0;i<50;i++){
    // ctx.moveTo(padding+20*i,200 - 90);
    // ctx.lineTo(padding+20*i+16,200 - 90);

    ctx.moveTo(padding + 20 * i, 200 - 140 - padding);
    ctx.lineTo(padding + 20 * i + 16, 200 - 140 - padding);
  }
  ctx.stroke();

  ctx.draw();
  // function show(type,num){
  //   if( type == "x"){
  //     return 
  //   }
  // }

}


