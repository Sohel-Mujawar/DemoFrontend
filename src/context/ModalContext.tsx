/* eslint-disable */
import {ReactNode} from '@tanstack/react-router';
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {BiCheck, BiTrash} from 'react-icons/bi';

// Define the type for the modal context value

interface ModalContextType {
  isModalOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (type: string, content: ReactNode, action?: () => void) => void;
  closeModal: () => void;
  confirm: boolean;
  setConfirm: React.Dispatch<SetStateAction<boolean>>;
}

// Define the type for the ModalProvider props
interface ModalProviderProps {
  children: ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [confirm, setConfirm] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<() => void>();

  const openModal = (type: string, content: ReactNode, action?: () => void) => {
    setModalContent(content);
    setIsModalOpen(true);
    setModalType(type);
    setModalAction(() => action); // Store action in state
  };

  const executeModalAction = async () => {
    // console.log('deleting...');
    try {
      if (modalAction) {
        await modalAction();
      }
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  const closeModal = () => {
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        confirm,
        setConfirm,
      }}
    >
      {children}
      {isModalOpen && modalType === 'SUCCESS' && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div className="relative w-125 rounded-lg bg-white p-10 text-center shadow-lg">
            <>
              <div className="flex items-center justify-center">
                <div
                  className={`items-centerw-30 flex justify-center rounded-full bg-green-500 p-4`}
                >
                  <BiCheck size={40} color="green" />
                </div>
              </div>
              <h1 className="mb-2.5 mt-2.5 text-xl font-medium text-black">
                Added Successfully!
              </h1>
            </>
            <p className="px-4 pt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since
              {modalContent}
            </p>
            <div className="mt-6 flex justify-around">
              <button
                className="mx-2 w-full rounded border border-blue-100 bg-slate-50 p-3 font-medium text-black hover:bg-primary hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && modalType === 'DELETE' && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div className="relative w-125 rounded-lg bg-white p-10 text-center shadow-lg">
            <>
              <div className="flex items-center justify-center">
                <div
                  className={`items-centerw-30 flex justify-center rounded-full bg-red-200 p-4`}
                >
                  <BiTrash size={30} color="red" />
                </div>
              </div>
              <h1 className="mb-2.5 mt-2.5 text-xl font-medium text-black">
                Do you really want to delete?
              </h1>
            </>

            <p className="px-4 pt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since
            </p>
            <div className="mt-6 flex justify-around">
              <button
                className="mx-2 w-full rounded border border-blue-100 bg-slate-50 p-3 font-medium text-black hover:bg-red-500 hover:text-white"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="mx-2 w-full rounded border border-blue-100 bg-red-500 p-3 font-medium text-white hover:bg-opacity-90"
                onClick={executeModalAction}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && modalType === 'COMPONENT' && (
        <div
          className={`fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50`}
        >
          <div className="relative w-125 rounded-lg bg-white p-10 text-center shadow-lg">
            {modalContent}
          </div>
        </div>
      )}
      {isModalOpen && modalType === 'INFO' && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-125 rounded-lg bg-white p-10 text-center shadow-lg">
            <div className="flex items-center justify-center">
              <div
                className={`items-centerw-30 flex justify-center rounded-full bg-indigo-200 p-4`}
              >
                <BiCheck size={30} color="blue" />
              </div>
            </div>

            <div>
              <h1 className="mb-2.5 text-xl font-medium text-black">
                Your Message sent successfully!
              </h1>
              <div className="mx-auto mb-6 w-20 border-b-4 border-primary"></div>
            </div>

            <p className="px-4 pt-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since
            </p>
            <div className="mt-6 flex justify-around">
              <button
                className="mx-2 w-full rounded border border-blue-100 bg-slate-50 p-3 font-medium text-black hover:bg-red-500 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="mx-2 w-full rounded border border-blue-100 bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                onClick={executeModalAction}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
