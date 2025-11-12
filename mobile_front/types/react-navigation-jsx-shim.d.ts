import type * as React from 'react';

// Type shims to relax JSX component typing for React Navigation in this project setup.
// These declarations allow using NavigationContainer and Stack.Navigator as JSX components
// without strict generic constraints that are causing diagnostics in App.tsx.

declare module '@react-navigation/native' {
  export const NavigationContainer: React.ComponentType<any>;
}

declare module '@react-navigation/native-stack' {
  export function createNativeStackNavigator(): {
    Navigator: React.ComponentType<any>;
    Screen: React.ComponentType<any>;
  };
}

// Ambient module declarations to prevent TypeScript from reporting
// "Cannot find module ... or its corresponding type declarations" for screen imports
// that are valid at runtime in Expo/React Native bundler.
declare module './screens/menu/EduListDetail' {
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module './screens/menu/NoticeItemlistDetail' {
  const Component: React.ComponentType<any>;
  export default Component;
}