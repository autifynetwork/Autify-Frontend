import Image from 'next/image';
import TextInput from '@/components/ui/Input/TextInput';
import ImageUploadInput from '@/components/ui/Input/ImageUploadInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';

const AddCategory = ({
    categoryData,
    onFieldChange,
    image,
    setImage,
    handleUpdate,
    itemToUpdate,
    onUpdateFieldChange,
}: any) => {
    return (
        <>
            {!handleUpdate && (
                <div>
                    <h1 className="text-2xl font-semibold">Add Category</h1>
                    <Underline />
                </div>
            )}
            {/* <div className={'absolute right-10 w-[100px] h-[100px] rounded-lg ' + (handleUpdate && '-mt-16')}>
                {image ? (
                    <Image src={image} alt="image" objectFit="cover" layout="fill" className="rounded-lg" priority />
                ) : (
                    <div
                        className={`bg-primary-300 opacity-40 w-full h-full flex items-center justify-center rounded-lg text-light-100 text-4xl`}>
                        <i className="fa-solid fa-image"></i>
                    </div>
                )}
            </div> */}
            <div className="grid grid-cols-2 gap-10 mt-6">
                <TextInput
                    label={'Category Name'}
                    type={'text'}
                    value={handleUpdate ? itemToUpdate.name : categoryData.name}
                    name={'name'}
                    onFieldChange={handleUpdate ? onUpdateFieldChange : onFieldChange}
                    placeholder="Ex. Garments"
                    required={true}
                />

                {/* <ImageUploadInput
                    image={image}
                    setImage={setImage}
                    label={'Category Image (Ratio 1 : 1)'}
                    required={false}
                /> */}
            </div>
            <div className="flex self-end">
                <Button type="submit" variant="primary">
                    {handleUpdate ? 'Update' : 'Submit'}
                </Button>
            </div>
        </>
    );
};

export default AddCategory;
