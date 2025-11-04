import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MessageModal, MessageModalProps } from '../components/MessageModal';
import { ToastMessage, ToastMessageProps } from '../components/ToastMessage';

interface MessageContextType {
  showModal: (props: Omit<MessageModalProps, 'visible' | 'onClose'>) => void;
  showToast: (props: Omit<ToastMessageProps, 'visible' | 'onHide'>) => void;
  hideModal: () => void;
  hideToast: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [modalProps, setModalProps] = useState<MessageModalProps | null>(null);
  const [toastProps, setToastProps] = useState<ToastMessageProps | null>(null);

  const showModal = (props: Omit<MessageModalProps, 'visible' | 'onClose'>) => {
    setModalProps({
      ...props,
      visible: true,
      onClose: () => {
        setModalProps(null);
        if (props.onConfirm) {
          // onConfirm이 있는 경우는 별도 처리
        }
      },
    });
  };

  const showToast = (props: Omit<ToastMessageProps, 'visible' | 'onHide'>) => {
    setToastProps({
      ...props,
      visible: true,
      onHide: () => setToastProps(null),
    });
  };

  const hideModal = () => {
    setModalProps(null);
  };

  const hideToast = () => {
    setToastProps(null);
  };

  return (
    <MessageContext.Provider value={{ showModal, showToast, hideModal, hideToast }}>
      {children}
      {modalProps && <MessageModal {...modalProps} />}
      {toastProps && <ToastMessage {...toastProps} />}
    </MessageContext.Provider>
  );
};

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

// 편의 함수들
export const useAlert = () => {
  const { showModal } = useMessage();
  
  return {
    success: (title: string, message: string, onConfirm?: () => void) =>
      showModal({ title, message, type: 'success', onConfirm }),
    error: (title: string, message: string, onConfirm?: () => void) =>
      showModal({ title, message, type: 'error', onConfirm }),
    warning: (title: string, message: string, onConfirm?: () => void) =>
      showModal({ title, message, type: 'warning', onConfirm }),
    info: (title: string, message: string, onConfirm?: () => void) =>
      showModal({ title, message, type: 'info', onConfirm }),
    confirm: (
      title: string, 
      message: string, 
      onConfirm: () => void, 
      onCancel?: () => void
    ) =>
      showModal({ 
        title, 
        message, 
        type: 'warning', 
        showCancel: true, 
        onConfirm
      }),
  };
};

export const useToast = () => {
  const { showToast } = useMessage();
  
  return {
    success: (message: string, duration?: number) =>
      showToast({ message, type: 'success', duration }),
    error: (message: string, duration?: number) =>
      showToast({ message, type: 'error', duration }),
    warning: (message: string, duration?: number) =>
      showToast({ message, type: 'warning', duration }),
    info: (message: string, duration?: number) =>
      showToast({ message, type: 'info', duration }),
  };
};