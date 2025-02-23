import React, {useEffect, useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import GenericInputField from '@/components/Forms/Input/GenericInputField';
import GenericButton from '@/components/Forms/Buttons/GenericButton';
import {useCreateBanner} from '@/lib/react-query/Admin/Banner/banner';
import toast from 'react-hot-toast';
import DisplayBanner from './DisplayBanner';

const BANNER_WIDTH = 1080;
const BANNER_HEIGHT = 1080;

const bannerSchema = z.object({
  title: z.string({required_error: 'Festival Plan is required'}),
  imageFile: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: 'At least one file is required',
  }),
});

type FormValues = z.infer<typeof bannerSchema>;

const Banner: React.FC = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(bannerSchema),
  });

  const {reset, watch, handleSubmit} = methods;

  const [isValidBanner, setIsValidBanner] = useState<boolean | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // To store the image URL for display

  const {
    mutate: createBanner,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateBanner();

  const watchFiles = watch('imageFile');
  const MIN_ASPECT_RATIO = 4.0;
  const MAX_ASPECT_RATIO = 6.1;

  const validateImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const imageAspectRatio = img.width / img.height;

        // Check if the aspect ratio is 4:1
        if (
          imageAspectRatio >= MIN_ASPECT_RATIO &&
          imageAspectRatio <= MAX_ASPECT_RATIO
        ) {
          setIsValidBanner(true);
          setImageError(null);
        } else {
          setIsValidBanner(false);
          setImageError(
            `Invalid image aspect ratio. Required: 4:1, Got: ${imageAspectRatio.toFixed(2)}`,
          );
        }

        setImageUrl(e.target?.result as string); // Store the image URL
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (watchFiles && watchFiles.length > 0) {
      const file = watchFiles[0];
      validateImage(file);
    }
  }, [watchFiles]);

  const onSubmit = (data: FormValues) => {
    // console.log('Data send Successfully', data);
    if (!isValidBanner) {
      toast.error('Please upload a valid banner image.');
      return;
    }

    const selectedFiles =
      watchFiles instanceof FileList ? Array.from(watchFiles) : [];
    createBanner({
      imageFile: selectedFiles[0],
      title: data.title,
    });
    // console.log('Selected Files:', selectedFiles);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success('Banner added successfully');
    } else if (isError) {
      console.error(error);
      toast.error('Something went wrong while creating the banner');
    }
  }, [isSuccess, isError, error, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 bg-white p-8 dark:bg-black"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          <h1 className="col-span-12 mb-4 text-lg font-semibold">Banner</h1>

          <div className="col-span-12 md:col-span-6">
            <GenericInputField
              name="title"
              label="Banner Name"
              placeholder="Enter Banner Name"
            />
          </div>

          <div className="col-span-12 md:col-span-6">
            <input
              type="file"
              {...methods.register('imageFile')}
              className="mt-10 bg-white file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:bg-black"
              multiple={false} // Allow only one file upload
            />
            {imageError && (
              <p className="mt-2 text-sm text-red-600">{imageError}</p>
            )}
            {imageUrl && (
              <div className="mt-4">
                <img
                  src={imageUrl}
                  alt="Banner Preview"
                  className="h-auto max-h-48 w-full rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          <GenericButton type="submit">
            {isPending ? 'Saving...' : 'Save'}
          </GenericButton>
        </div>
      </form>
      <DisplayBanner />
    </FormProvider>
  );
};

export default Banner;
