package com.tubeseek;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.tanguyantoine.react.MusicControl;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import cl.json.RNSharePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import android.webkit.WebView;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.ijzerenhein.magicmove.ReactMagicMovePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.wix.interactable.Interactable;
import com.nozbe.watermelondb.WatermelonDBPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
            new MusicControl(),
          new Interactable(),
            new RNFirebasePackage(),
            new RNSharePackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            // new ReactNativeYouTube(),
            new RNCWebViewPackage(),
            new ReactVideoPackage(),
            new ReactMagicMovePackage(),
            new RNFirebaseAnalyticsPackage(),
            new WatermelonDBPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    WebView.setWebContentsDebuggingEnabled(true);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
