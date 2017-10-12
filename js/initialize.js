var endMessage_title = "提醒您";
var endMessage_botton = "確定,取消";


//document.addEventListener("backbutton", function() { navigator.app.exitApp(); }, false); //回上一頁鈕

if(navigator.userAgent.match(/Android/i))
{
var display_mode = false;
}
 else if(navigator.userAgent.match(/iPad|iPhone|iPod/i))
 {
 var display_mode = true;
 }
  else
  {
  var display_mode = true; 
  }
window.plugins.spinnerDialog.show('請稍等','應用程序加載中...' + '\n' + '網速越快加載越快XD', display_mode); //加載初始化訊息

if(navigator.userAgent.match(/Windows Phone/i))
{
navigator.splashscreen.show(); //因為WP8的閃屏畫面消失的太快，所以目前讓它強迫再顯示一次
gotoapp(0);
}

function listArray(main)
{
var s = "";
for(key in main)
s += key + ": " + main[key] + "\n";
return s;
}

//推播功能開始
window.plugins.uniqueDeviceID.get(success, null);

function success(uuid)
{
 if(window.localStorage.getItem("uuid") == null)
 {
 window.localStorage.setItem("uuid", uuid);
 }
}

//初始化資訊
var push = PushNotification.init({
  "android": {
    "senderID": "909119150051",
    "icon": "",
    "iconColor": "gray",
    "sound": "true",
    "vibrate": "true",
    "clearBadge": "false",
    "clearNotifications": "true",
    "forceShow": "false",
    "topics": []
  },
  "ios": {
    "alert": "true",
    "badge": "true",
    "sound": "true",
    "clearBadge": "false",
    "categories": {
      "invite": {
        "yes": {
          "callback": "actions_left",
          "title": "接受",
          "foreground": true,
          "destructive": true
        },
        "no": {
          "callback": "actions_center",
          "title": "拒絕",
          "foreground": true,
          "destructive": false
        },
        "maybe": {
          "callback": "actions_right",
          "title": "也許",
          "foreground": true,
          "destructive": false
        }
      }
    }
  },
  "windows": {}
});

push.on('notification', function(data) { messagedata(data); }); //透過點擊訊息進來
window.actions_left = function(data) { messagedata(data); }; //透過點擊訊息的左邊按鈕進來
window.actions_center = function(data) { messagedata(data); }; //透過點擊訊息的中間按鈕進來
window.actions_right = function(data) { messagedata(data); }; //透過點擊訊息的右邊按鈕進來

function messagedata(data)
{
var message_type; //訊息種類
var myown; //自定義

 if(navigator.userAgent.match(/Android/i))
 {
 message_type = data.additionalData.notId;
 myown = data.additionalData.payload;
 }
 if(navigator.userAgent.match(/iPad|iPhone|iPod/i))
 {
 message_type = data.additionalData.payload.notId;
 myown = data.additionalData.payload.pushnotification_payload;
 }

navigator.notification.alert('外部的觸發如下：' + '\n' + '訊息：' + data.message + '\n' + '標題：' + data.title + '\n' + '數字：' + data.count + '\n' + '聲音：' + data.sound + '\n' + '影像：' + data.image + '\n' + '訊息種類：' + message_type + '\n' + '自定義：' + myown + '\n' + '按鈕觸發：' + data.additionalData.actionCallback + '\n' + 'collapse_key：' + data.additionalData.collapse_key + '\n' + '前景模式：' + data.additionalData.foreground + '\n' + '是否經由推播訊息進來：' + data.additionalData.coldstart, null, endMessage_title, endMessage_botton.split(",")[0]);
}

//偵測是否有推播的權限
PushNotification.hasPermission(function(data)
{
 if(data.isEnabled == true)
 {
 //navigator.notification.alert("推播功能是啟用的", null, endMessage_title, endMessage_botton.split(",")[0]);
 }
 if(data.isEnabled == false)
 {
 //navigator.notification.alert("推播功能是禁止的", null, endMessage_title, endMessage_botton.split(",")[0]);
 }
});

//註冊推播
push.on('registration', function(data)
{
 if(navigator.userAgent.match(/Android/i))
 {
 platform = 'android';
 }
 if(navigator.userAgent.match(/iPad|iPhone|iPod/i))
 {
 platform = 'ios';
 }
insertPushNotification(platform, data.registrationId);
});

//將推播資訊插入到資料庫
function insertPushNotification(action, action2)
{
 $.ajax(
 {
 url: "http://www.littlebau.com/phonegap/PushPlugin_register.php",
 type: 'POST',
 data: { pushnotification_platform: action, pushnotification_identify_id: action2, pushnotification_identify_uuid: window.localStorage.getItem("uuid"), pushnotification_device_name: device.model }, 
 beforeSend: function() {  },
  success: function(data, textStatus, xhr)
  {
  //navigator.notification.alert("推播新增成功，已新增的資料不會再重複新增", function() { gotoapp(); }, endMessage_title, endMessage_botton.split(",")[0]);
  gotoapp(0);
  },
  error: function(xhr, textStatus, errorThrown)
  {
  //navigator.notification.alert("推播新增失敗，請確定目的路徑檔名是否正確", function() { gotoapp(); }, endMessage_title, endMessage_botton.split(",")[0]);
  gotoapp(0);
  },
 });
}
//推播功能結束

//去遠端的位置
function gotoapp(action)
{
window.location = "https://www.littlebau.com/Framework7/index.php?action=" + action;
//window.location = "http://www.littlebau.com/cordova/index.php";
}

//當發生內部錯誤，緩存被中止會觸發事件錯誤
push.on('error', function(e)
{
navigator.notification.alert(e.message, null, endMessage_title, endMessage_botton.split(",")[0]);
});

//移除一個以前註冊過的回調事件。
/*push.off('notification', function(data)
{
navigator.notification.alert('off：' + listArray(data), null, endMessage_title, endMessage_botton.split(",")[0]);
});*/

//解除註冊推播
/*push.unregister(function()
{
navigator.notification.alert("解除註冊成功", null, endMessage_title, endMessage_botton.split(",")[0]);
}, 
 function()
 {
 navigator.notification.alert("解除註冊失敗", null, endMessage_title, endMessage_botton.split(",")[0]);
 }
);*/

//訂閱
/*push.subscribe('my-topic', function()
{
navigator.notification.alert('訂閱成功', null, endMessage_title, endMessage_botton.split(",")[0]);
}, 
 function(e)
 {
 navigator.notification.alert('訂閱失敗：' + e, null, endMessage_title, endMessage_botton.split(",")[0]);
 });*/
 
 //取消訂閱
/*push.unsubscribe('my-topic', function()
{
navigator.notification.alert('取消訂閱成功', null, endMessage_title, endMessage_botton.split(",")[0]);
}, 
 function(e)
 {
 navigator.notification.alert('取消訂閱失敗：' + e, null, endMessage_title, endMessage_botton.split(",")[0]);
 });*/

/*if(navigator.userAgent.match(/Android|iPad|iPhone|iPod/i))
{
 //當應用程序沒有執行的時候設定氣泡顯示
 push.setApplicationIconBadgeNumber(function()
 {
 navigator.notification.alert("setApplicationIconBadgeNumber成功：" + n, null, endMessage_title, endMessage_botton.split(",")[0]);
 }, 
  function()
  {
  navigator.notification.alert("setApplicationIconBadgeNumber錯誤", null, endMessage_title, endMessage_botton.split(",")[0]);
  }, 2
 );
}*/
 
/*if(navigator.userAgent.match(/iPad|iPhone|iPod/i))
{
 //當應用程序沒有執行的時候得到氣泡數量
 push.getApplicationIconBadgeNumber(function(n)
 {
 navigator.notification.alert("getApplicationIconBadgeNumber成功：" + n, null, endMessage_title, endMessage_botton.split(",")[0]);
 }, 
  function()
  {
  navigator.notification.alert("getApplicationIconBadgeNumber錯誤", null, endMessage_title, endMessage_botton.split(",")[0]);
  }
 );
 
 //告訴系統你已經完成了背景推播通知
 push.finish(function()
 {
 navigator.notification.alert("finish成功", null, endMessage_title, endMessage_botton.split(",")[0]);
 }, 
  function()
  {
  navigator.notification.alert("finish錯誤", null, endMessage_title, endMessage_botton.split(",")[0]);
  }, 'push-1'
 );
}*/

/*if(navigator.userAgent.match(/Android|iPad|iPhone|iPod/i))
{
 //當應用程序沒有執行的時候設定氣泡顯示
 push.clearAllNotifications(function()
 {
 navigator.notification.alert("清除所有推播成功", null, endMessage_title, endMessage_botton.split(",")[0]);
 }, 
  function()
  {
  navigator.notification.alert("清除所有推播失敗", null, endMessage_title, endMessage_botton.split(",")[0]);
  }
 );
}*/