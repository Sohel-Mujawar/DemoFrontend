import React from 'react';

interface ModalPropTypes {
  title: string;
  content: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onClickNo: () => void;
  onClickYes: () => void;
  refetch: () => void;
}

const Modal: React.FC<ModalPropTypes> = (props) => {
  const {
    content,
    title,
    onClickNo,
    onClickYes,
    setShowModal,
    showModal,
    refetch,
  } = props;

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
    <div
      id="default-modal"
      tabIndex={-1}
      // aria-hidden="true"
      className={`z-10 ${!showModal && 'hidden'} left-0 top-0 h-screen w-screen rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark`}
    >
      <div className="absolute left-20 top-50 z-20 max-h-full w-full max-w-2xl translate-x-50 translate-y-20 p-4">
        {/* Modal content */}
        <div className="dark:bg-gray-700 relative rounded-lg bg-white shadow">
          {/* Modal header */}
          <div className="dark:border-gray-600 flex items-center justify-between rounded-t border-b p-4 md:p-5">
            <h3 className="text-gray-900 text-xl font-semibold dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={() => setShowModal(false)}
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <div className="space-y-4 p-4 md:p-5">
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {content}
            </p>
          </div>
          {/* Modal footer */}
          <div className="border-gray-200 dark:border-gray-600 flex items-center rounded-b border-t p-4 md:p-5">
            <button
              data-modal-hide="default-modal"
              type="button"
              onClick={onAcceptHandler}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Yes
            </button>
            <button
              data-modal-hide="default-modal"
              type="button"
              onClick={onDeclineHandler}
              className="text-gray-900 border-gray-200 hover:bg-gray-100 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 ms-3 rounded-lg border bg-white px-5 py-2.5 text-sm font-medium hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 dark:hover:text-white"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
