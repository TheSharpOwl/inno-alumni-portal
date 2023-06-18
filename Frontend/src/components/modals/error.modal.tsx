import { useEffect } from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ModalProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-md text-red-500">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;