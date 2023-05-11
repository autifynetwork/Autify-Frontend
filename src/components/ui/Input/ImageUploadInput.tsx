import ImageUpload from '@/components/ui/ImageUpload';

export default function ImageUploadInput({ image, setImage, label, required = true }: any) {
    return (
        <div className="w-full flex flex-col justify-end mt-4">
            <p className="text-dark-700 font-medium mb-2 text-start">{label}</p>

            <ImageUpload image={image} setImage={setImage} required={required} />
        </div>
    );
}
