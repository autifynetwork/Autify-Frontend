import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Dropdown from '@/components/ui/Input/Dropdown';

const AddProductSku = ({
    productSkuData,
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
                    <h1 className="text-2xl font-semibold">Product SKU</h1>
                    <Underline />
                </div>
            )}

            <div className="grid grid-cols-2 gap-10 mt-6">
                <TextInput
                    label={'Add SKU'}
                    type={'text'}
                    value={handleUpdate ? itemToUpdate.name : productSkuData.name}
                    name={'name'}
                    onFieldChange={handleUpdate ? onUpdateFieldChange : onFieldChange}
                    placeholder="Ex. UGG-BB-PUR-06"
                    required={true}
                />

                <Dropdown
                    label={'Main Category Title'}
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

export default AddProductSku;
