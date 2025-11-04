import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

export interface ToastMessageProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide?: () => void;
  position?: 'top' | 'bottom' | 'center';
}

export const ToastMessage: React.FC<ToastMessageProps> = ({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'bottom'
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#4CAF50', icon: '✓' };
      case 'error':
        return { backgroundColor: '#F44336', icon: '✕' };
      case 'warning':
        return { backgroundColor: '#FF9800', icon: '⚠' };
      default:
        return { backgroundColor: '#333', icon: 'ℹ' };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return { top: 100 };
      case 'center':
        return { top: Dimensions.get('window').height / 2 - 25 };
      default:
        return { bottom: 100 };
    }
  };

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onHide) {
        onHide();
      }
    });
  };

  if (!visible) {
    return null;
  }

  const typeStyles = getTypeStyles();
  const positionStyles = getPositionStyles();

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyles,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.toast, { backgroundColor: typeStyles.backgroundColor }]}>
        <Text style={styles.icon}>{typeStyles.icon}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    maxWidth: width - 40,
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 16,
    color: 'white',
    marginRight: 8,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
});