import { useState } from 'react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@/components/ui/Button';

function ImageCrop({ imageToCrop, setCroppedImage, setShowModal, aspectRatio }: any) {
    // imageToCrop is the user selected image
    // setCroppedImage is the cropped image state setter function
    const [cropConfig, setCropConfig] = useState<any>(
        // default crop config
        {
            unit: '%',
            width: 640,
            aspect: parseInt(`${aspectRatio.width}`) / parseInt(`${aspectRatio.height}`),
        }
    );
    const [imageRef, setImageRef] = useState();

    async function cropImage(crop: any) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(imageRef, crop);
            // calling the props function to expose
            // croppedImage to the parent component
            URL.revokeObjectURL(imageToCrop);
            setCroppedImage(croppedImage);
        }
    }

    function getCroppedImage(sourceImage: any, cropConfig: any) {
        // creating the cropped image from the source image
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = Math.ceil(cropConfig.width * scaleX);
        canvas.height = Math.ceil(cropConfig.height * scaleY);
        const ctx = canvas.getContext('2d');

        if (ctx)
            ctx.drawImage(
                sourceImage,
                cropConfig.x * scaleX,
                cropConfig.y * scaleY,
                cropConfig.width * scaleX,
                cropConfig.height * scaleY,
                0,
                0,
                cropConfig.width * scaleX,
                cropConfig.height * scaleY
            );

        // Method 1
        // DataURL(memory loaded based) is less efficient than ObjectURL(reference based)
        // qualtiy: 0.15 (60% compression)
        const base64Image = canvas.toDataURL('image/jpeg', 0.6);
        return base64Image;

        // Method 2
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob((blob) => {
        //         // returning an error
        //         if (!blob) {
        //             reject(new Error("Canvas is empty"));
        //             return;
        //         }

        //         blob.name = fileName;
        //         // creating a Object URL representing the Blob object given
        //         const croppedImageUrl = URL.createObjectURL(blob);

        //         resolve(croppedImageUrl);
        //     }, "image/jpeg");
        // });
    }

    return (
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="relative inline-block overflow-hidden text-left align-bottom transition-all transform shadow-xl rounded-xl bg-none sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                <div className="px-5 pt-7 pb-6 dark:backdrop-blur-[7px] backdrop-blur-[7px] bg-[rgba(255,255,255,0.9)]">
                    <div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            {/* Modal Heading */}
                            <Dialog.Title as="h3" className="mb-4 text-lg font-medium leading-6 text-gray-900">
                                Crop your image
                            </Dialog.Title>
                            {/* Crop Component */}
                            <div className="flex items-center justify-center">
                                <ReactCrop
                                    src={imageToCrop}
                                    crop={cropConfig}
                                    ruleOfThirds
                                    imageStyle={{ height: '270px' }}
                                    onImageLoaded={(imageRef: any) => setImageRef(imageRef)}
                                    onChange={(cropConfig: any) => setCropConfig(cropConfig)}
                                    crossorigin="anonymous" // to avoid CORS-related problems
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 pt-6 pb-10 backdrop-blur-[7px] bg-[rgba(255,255,255,0.9)] sm:px-10 sm:flex-row flex flex-col justify-end gap-6">
                    <Button
                        type="button"
                        variant={'white'}
                        onClick={() => {
                            URL.revokeObjectURL(imageToCrop);
                            setShowModal(false);
                        }}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant={'primary'}
                        onClick={() => {
                            setShowModal(false);
                            cropImage(cropConfig);
                        }}>
                        Confirm
                    </Button>
                </div>
            </div>
        </Transition.Child>
    );
}

ImageCrop.defaultProps = {
    setCroppedImage: () => {},
};

export default ImageCrop;
