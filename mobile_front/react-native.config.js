// Disable autolinking for web-only packages that do not provide iOS/Android native pods
// This helps avoid CocoaPods install failures during EAS iOS builds.
// Reference: https://github.com/react-native-community/cli/blob/main/docs/autolinking.md#how-can-i-disable-autolinking-for-unsupported-library

module.exports = {
  dependencies: {
    '@expo/dom-webview': {
      platforms: {
        ios: null,
        android: null,
      },
    },
  },
};