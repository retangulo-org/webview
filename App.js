import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBackButtonPress = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }

    return false;
  }, [canGoBack]);

  const handleNavigationStateChange = useCallback((navState) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButtonPress,
    );

    return () => subscription.remove();
  }, [handleBackButtonPress]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <View style={styles.container}>
          <WebView
            ref={webViewRef}
            source={{ uri: "https://mobile.retangulo.org" }}
            style={styles.webview}
            cacheEnabled={true}
            thirdPartyCookiesEnabled
            sharedCookiesEnabled
            cacheMode="LOAD_CACHE_ELSE_NETWORK"
            automaticallyAdjustContentInsets={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            androidLayerType="hardware"
            scrollEnabled
            setBuiltInZoomControls={false}
            onNavigationStateChange={handleNavigationStateChange}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2563EB",
  },
  container: {
    flex: 1,
    backgroundColor: "#2563EB",
  },
  webview: {
    flex: 1,
    backgroundColor: "#2563EB",
  },
});
