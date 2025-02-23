import {
  useDeleteBanner,
  useGetAllBanners,
} from '@/lib/react-query/Admin/Banner/banner';
import React, {useState} from 'react';
import {MdDelete} from 'react-icons/md';
import {IoMdClose} from 'react-icons/io';
import toast from 'react-hot-toast';

type BannerData = {
  id: string; // Using `id` instead of `_id`
  title: string;
  image: string | undefined;
};

const DisplayBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  const {data, isLoading, error} = useGetAllBanners();
  // console.log('data', data);
  const {mutate: deleteBanner} = useDeleteBanner();

  const handleDelete = (id: string | undefined) => {
    // console.log('id', id);
    if (!id) {
      return;
    }
    deleteBanner(id, {
      onError: () => toast.error('Error deleting banner:'),
      onSuccess: () => toast.success(' Banner Deleted '),
      // console.log('Banner deleted successfully'),
    });
  };

  const handleImageClick = (image: string | undefined) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  return (
    <div className="relative mt-4 overflow-x-auto rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
      <h1 className="mb-4 text-2xl font-semibold">All Banners</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error.message}</p>
      ) : data && data.length > 0 ? (
        <table className="w-full table-auto border-b border-l border-r border-t border-stroke dark:border-strokedark">
          <thead>
            <tr className="bg-gray-2 dark:bg-meta-4">
              <th className="border-r border-stroke px-4 py-4 text-left dark:border-strokedark">
                Name
              </th>
              <th className="border-r border-stroke px-4 py-4 text-left dark:border-strokedark">
                Image
              </th>
              <th className="px-4 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: BannerData) => (
              <tr
                key={item.id}
                className="border-b border-stroke dark:border-strokedark"
              >
                <td className="border-r border-stroke px-4 py-4 dark:border-strokedark">
                  {item.title}
                </td>
                <td className="border-r border-stroke px-4 py-4 dark:border-strokedark">
                  <img
                    src={item.image ?? ''}
                    alt={item.title}
                    className="max-h-16 max-w-16 cursor-pointer rounded object-cover"
                    onClick={() => handleImageClick(item.image)}
                  />
                </td>
                <td className="px-4 py-4">
                  <button
                    className="text-gray-600 hover:text-red-900"
                    onClick={() => handleDelete(item.id)}
                  >
                    <MdDelete className="inline-block h-6 w-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No banners available</p>
      )}
      {isOpen && selectedImage && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-screen relative max-h-screen">
            <img
              src={selectedImage}
              className="max-h-full max-w-full rounded-lg"
              onClick={() => setIsOpen(false)}
            />
            <button
              className="absolute right-0 top-0 m-4 text-white"
              onClick={() => setIsOpen(false)}
            >
              <IoMdClose className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayBanner;
