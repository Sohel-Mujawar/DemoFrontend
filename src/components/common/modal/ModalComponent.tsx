import React from 'react';
import {BiCheck} from 'react-icons/bi';

type operation = 'success' | 'delete' | 'inform';

type IModalPropsTypes = {
  type: operation;
  title: string;
  content: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onClickNo: () => void;
  onClickYes: () => void;
  refetch: () => void;
};

const InfoModal: React.FC<IModalPropsTypes> = (props) => {
  const {onClickNo, onClickYes, refetch, setShowModal, type} = props;

  const onAcceptHandler = () => {
    onClickYes();
    setShowModal(false);
    refetch();
  };

  const onDeclineHandler = () => {
    onClickNo();
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-125 rounded-lg bg-white p-10 text-center shadow-lg">
        <div className="flex items-center justify-center">
          <div
            className={`items-centerw-30 flex justify-center rounded-full ${type === 'delete' ? 'bg-red-200' : 'bg-indigo-200'} p-4`}
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
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since
        </p>
        <div className="mt-6 flex justify-around">
          <button
            className="mx-2 w-full rounded border border-blue-100 bg-slate-50 p-3 font-medium text-black hover:bg-red-500 hover:text-white"
            onClick={onDeclineHandler}
          >
            Cancel
          </button>
          <button
            className="mx-2 w-full rounded border border-blue-100 bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            onClick={onAcceptHandler}
          >
            'View Details'
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
