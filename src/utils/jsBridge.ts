export function setupWKWebViewJavascriptBridge(callback: any) {
  if (isMac()) {
    if (!window.WKWebViewJavascriptBridge) {
      throw new Error('must be inject macOsInject.js');
    }
    return callback(window.WKWebViewJavascriptBridge);
  }
  if (window.WKWebViewJavascriptBridge) {
    return callback(window.WKWebViewJavascriptBridge);
  }
  if (window.WKWVJBCallbacks) {
    return window.WKWVJBCallbacks.push(callback);
  }
  window.WKWVJBCallbacks = [callback];
  window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
}

export function isMac() {
  return navigator.userAgent.includes('Mac');
}

export function setUpBridge() {
  if (window.macOsInjectWKWebViewJavascriptBridge) {
    window.macOsInjectWKWebViewJavascriptBridge();
  }
}

export function createJsBridge() {
  if (!window.macOsInjectWKWebViewJavascriptBridge && isMac()) {
    console.log('iframe init jsBridge');

    // const TARGET_ORIGIN = 'file://*';
    const TARGET_ORIGIN = '*';
    // 初始化
    window.macOsInjectWKWebViewJavascriptBridge = function (func) {
      window.WKWVJBCallbacks = {};
      window.localTimer = {};
      window.onmessage = handelMessage;
      window.WKWebViewJavascriptBridge = {
        callHandler: callHandler,
      };
      window.setupWKWebViewJavascriptBridge = func;
    };

    // 处理postmessage回调
    function handelMessage(e) {
      const { callbackid, response } = e.data || {};
      const { status } = response || {};

      // if (!e.origin || e.origin.length === 0) {
      //   if (window.localTimer[callbackid])
      //     clearInterval(window.localTimer[callbackid]);
      //   console.error('Receive Message Origin Is Undefined!');
      // }
      // if (e.origin !== 'file://') {
      //   if (window.localTimer[callbackid])
      //     clearInterval(window.localTimer[callbackid]);
      //   console.error('Receive Unknown Origin Message!');
      // }
      console.log('iframe receive postmessage data: ' + JSON.stringify(e.data));

      if (!status) {
        console.log('receive data no status information.');
        if (window.localTimer[callbackid])
          clearInterval(window.localTimer[callbackid]);
        console.error('error postmessage data receive!');
      }

      if (!callbackid || callbackid.length === 0) {
        if (window.localTimer[callbackid])
          clearInterval(window.localTimer[callbackid]);
        console.log(
          'clear local Interval timer, timer_id: ' +
            window.localTimer.toString(),
        );
      }

      return responseTempOperation(response, callbackid);
    }

    // 回调数据临时存储
    function responseTempOperation(response, callbackid) {
      window.WKWVJBCallbacks[callbackid] = response;
    }

    // getToken、removeToken、closePage 等触发事件
    async function callHandler(methodName, params, callback) {
      console.log('received a post request, trigger callHandler.');
      callback(await postmessage(methodName, params));
    }

    // postmessage
    async function postmessage(methodName, params) {
      const callbackid = uuid();
      const message = {
        params,
        callbackid,
        methodName,
      };
      window.top.postMessage(message, TARGET_ORIGIN);
      console.log(
        'post request data:' +
          JSON.stringify(message) +
          ' && targetOrigin:' +
          TARGET_ORIGIN,
      );
      return new Promise((resolve) => {
        window.localTimer[callbackid] = setInterval(() => {
          if (window.WKWVJBCallbacks[callbackid]) {
            if (window.localTimer[callbackid])
              clearInterval(window.localTimer[callbackid]);
            const result = window.WKWVJBCallbacks[callbackid];
            window.WKWVJBCallbacks[callbackid] = undefined;
            resolve(result);
          }
        }, 100);
      });
    }

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    }
  }
}
