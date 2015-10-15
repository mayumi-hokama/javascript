var isIos = true;
var isAndroid = false;

(function() {
  appOpen = function(options) {
      this.options = options;
      // optionチェック
      this.schemeStr = options.scheme || null;
      this.reverseUrl = options.reverseUrl || null;
      this.appNotFoundUrl = options.appNotFoundUrl || null;
      this.iOSTime = options.iOSTime || 20;
      this.androidTime = options.androidTime || 500;

      console.log(this.schemeStr);
      console.log(this.reverseUrl);

      if (this._isValid() == true) {
          this._open();
      } else {
          this._exit();
      }
  };

  appOpen.prototype = {
      // parameterのチェック
      _isValid : function() {
        // parameter不正
        if (this.schemeStr == null || this.reverseUrl == null) {
            console.log('error');
            return false;
        }
        return true;
      },

      // 終了
      _exit : function() {
          setTimeout(function() {
            location.replace(this.reverseUrl);
          }, 5000);
      },

      // オープン
      _open : function() {
        if (isIos && !isAndroid) {
            this._iOS();
        } else if (!isIos && isAndroid) {
            this._android();
        } else {
            this._exit();
        }
      },

      /**
       * androidの処理
       * URLスキーム または インテント
       */
      _android : function() {
        location.replace(this.schemeStr);

        var that = this;
        setTimeout(function() {
          that._exit();
        }, this.androidTime);
      },

      /**
       * iOSの処理
       * URLスキーム対応。
       */
      _iOS : function() {
          var start = Date.now();
          // ifreamで実行
          var iframe = document.createElement('iframe');
          iframe.src = this.schemeStr;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          // ----- 以下はブラウザに戻ったタイミングで実行される -----
          // ゆえにココがすぐさま実行される = サスペンドされなかった = アプリ入ってない
          if ( (Date.now() - start) < this.iOSTime) {
              // アプリが入っていない場合
              this.iOSNotFound();
              this._exit();
          } else {
              this._exit();
          }
      },

      // アプリが入っていない場合
      iOSNotFound : function() {
          if (this.appNotFoundUrl != null) {
              location.href = this.appNotFoundUrl;
          } else {
              this._exit();
          }
      },
  };
  return appOpen;
})();

// 実行
// click時にやるかな
new appOpen({
    // URLスキーム
    scheme : "twitter://messages",
    // 戻る用のページ
    reverseUrl : "http://google.com",
    // アプリ入っていない時に開くページ
    appNotFoundUrl : "http://yahoo.co.jp",
    // androidタイムアウト
    androidTime : 500,
    // iOSタイム
    iOSTime : 20
});
