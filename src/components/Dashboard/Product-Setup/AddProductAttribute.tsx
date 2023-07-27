import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Dropdown from '@/components/ui/Input/Dropdown';

const AddProductAttribute = ({
    productAttributeData,
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
                    <h1 className="text-2xl font-semibold">Product Attribute</h1>
                    <Underline />
                </div>
            )}

            <div className="grid grid-cols-2 gap-10 mt-6">
                <TextInput
                    label={'Add Attribute'}
                    type={'text'}
                    value={handleUpdate ? itemToUpdate.name : productAttributeData.name}
                    name={'name'}
                    onFieldChange={handleUpdate ? onUpdateFieldChange : onFieldChange}
                    placeholder="Ex. Size"
                    required={true}
                />

                <Dropdown
                    label={'Select Category'}
                    id={'select-category'}
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

export default AddProductAttribute;
