import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Dropdown from '@/components/ui/Input/Dropdown';

const AddSubCategory = ({
    subCategoryData,
    categories,
    onFieldChange,
    handleUpdate,
    itemToUpdate,
    onUpdateFieldChange,
}: any) => {
    return (
        <>
            {!handleUpdate && (
                <div>
                    <h1 className="text-2xl font-semibold">Add Sub-Category</h1>
                    <Underline />
                </div>
            )}

            <div className="grid grid-cols-2 gap-10 mt-6">
                <TextInput
                    label={'Sub-Category Name'}
                    type={'text'}
                    value={handleUpdate ? itemToUpdate.name : subCategoryData.name}
                    name={'name'}
                    onFieldChange={handleUpdate ? onUpdateFieldChange : onFieldChange}
                    placeholder="Ex. Garments"
                    required={true}
                />

                <Dropdown
                    label={'Main Category'}
                    id={'main-category'}
                    name={'mainCategory'}
                    options={categories}
                    objKey={'name'}
                    setChoice={handleUpdate ? onUpdateFieldChange : onFieldChange}
                    placeholder="Ex. Garments"
                    defaultOption={handleUpdate ? itemToUpdate?.mainCategory?.categoryName : categories[0]?.name}
                    required={true}
                />
            </div>

            <div className="flex self-end">
                <Button type="submit" variant="primary">
                    {handleUpdate ? 'Update' : 'Submit'}
                </Button>
            </div>
        </>
    );
};

export default AddSubCategory;
