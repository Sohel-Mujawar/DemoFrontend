import React, {useState} from 'react';
import {useNavigate} from '@tanstack/react-router';
import Loader from '../common/Loader';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({onClose}) => {
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNavigate = () => {
    setIsLoading(true); // Set loading state when navigating
    navigate({to: '/customer/customerprofilec'});
  };

  const handleClose = () => {
    setModalVisible(false);
    onClose();
  };

  if (isLoading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <div className="bg-gray-900 fixed inset-0 flex items-center justify-center bg-opacity-70">
      {isModalVisible && (
        <div className="max-w-2xl rounded-lg bg-white p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-black">
              Profile Update Needed
            </h2>
          </div>
          <p className="text-gray-700 text-lg">
            🚨 Attention! Your profile is incomplete! Complete your profile now
            to unlock your commissions and ensure you don’t miss out on your
            earnings. Take action today!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleNavigate}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
