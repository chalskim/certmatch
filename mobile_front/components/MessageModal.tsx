import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

export interface MessageModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
  confirmText?: string;
  showCancel?: boolean;
  cancelText?: string;
  onConfirm?: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  visible,
  title,
  message,
  onClose,
  type = 'info',
  confirmText = '확인',
  showCancel = false,
  cancelText = '취소',
  onConfirm
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#4CAF50', icon: '✓' };
      case 'error':
        return { backgroundColor: '#F44336', icon: '✕' };
      case 'warning':
        return { backgroundColor: '#FF9800', icon: '⚠' };
      default:
        return { backgroundColor: '#2196F3', icon: 'ℹ' };
    }
  };

  const typeStyles = getTypeStyles();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={[styles.header, { backgroundColor: typeStyles.backgroundColor }]}>
            <Text style={styles.icon}>{typeStyles.icon}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            {showCancel && (
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.confirmButton,
                { backgroundColor: typeStyles.backgroundColor },
                showCancel && styles.buttonHalf
              ]} 
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 280,
    maxWidth: 400,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  icon: {
    fontSize: 24,
    color: 'white',
    marginRight: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 16,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHalf: {
    borderLeftWidth: 1,
    borderLeftColor: '#E0E0E0',
  },
  cancelButton: {
    backgroundColor: 'white',
  },
  confirmButton: {
    // backgroundColor will be set dynamically based on type
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});