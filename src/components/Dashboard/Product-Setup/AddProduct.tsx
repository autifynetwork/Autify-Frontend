import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Underline from '@/components/ui/Underline';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';

const AddProduct = () => {
    const [productData, setProductData] = useState({ name: '', description: '' });
    const onProductFieldChange = (e: { target: { name: any; value: any } }) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const [categoryData, setCategoryData] = useState({ mainCategory: '', subCategory: '', unit: '', expiry: '' });
    const onCategoryFieldChange = (e: { target: { name: any; value: any } }) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const [productInformationData, setProductInformationData] = useState({
        materialUsed: '',
        location: '',
        manufacturingDetails: '',
        certifications: '',
    });
    const onProductInformationChange = (e: { target: { name: any; value: any } }) => {
        setProductInformationData({ ...productInformationData, [e.target.name]: e.target.value });
    };

    const [productAttributeData, setProductAttributeData] = useState({
        attributes: '',
        sku: '',
        specialFeatures: '',
    });
    const onProductAttributeChange = (e: { target: { name: any; value: any } }) => {
        setProductAttributeData({ ...productAttributeData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="w-full flex gap-8">
                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-2xl font-semibold">Add Product Details</h1>
                        <Underline />
                    </div>

                    <div className="flex flex-col gap-8 mt-6">
                        <TextInput
                            label={'Product Name'}
                            type={'text'}
                            value={productData.name}
                            name={'name'}
                            onFieldChange={onProductFieldChange}
                            placeholder="Ex. Xyzzy"
                            required={true}
                        />

                        <Textarea
                            label={'Product Description'}
                            value={productData.description}
                            name={'description'}
                            onFieldChange={onProductFieldChange}
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            required={true}
                        />
                    </div>
                </div>

                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-2xl font-semibold text-primary-500">Choose Category</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-6">
                        <TextInput
                            label={'Main Category'}
                            type={'text'}
                            value={categoryData.mainCategory}
                            name={'mainCategory'}
                            onFieldChange={onCategoryFieldChange}
                            placeholder="Main Category Title"
                            required={true}
                        />

                        <TextInput
                            label={'Sub-Category'}
                            type={'text'}
                            value={categoryData.subCategory}
                            name={'subCategory'}
                            onFieldChange={onCategoryFieldChange}
                            placeholder="Sub Category Title"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <TextInput
                            label={'Unit'}
                            type={'text'}
                            value={categoryData.unit}
                            name={'unit'}
                            onFieldChange={onCategoryFieldChange}
                            placeholder="Pcs"
                            required={true}
                        />

                        <TextInput
                            label={'Expiry/Warranty'}
                            type={'text'}
                            value={categoryData.expiry}
                            name={'expiry'}
                            onFieldChange={onCategoryFieldChange}
                            placeholder="Ex: 2y Warranty"
                            required={true}
                        />
                    </div>
                </div>
            </div>

            <div className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <div className="grid grid-cols-6">
                    <div className="col-span-1 w-full flex flex-col justify-center items-center px-10 py-12 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary-500"></i>
                        <p className="mt-4 text-primary-500 font-semibold">Upload Image</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex gap-8">
                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-xl font-semibold text-primary-500">Product Information</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-6">
                        <TextInput
                            label={'Material Used'}
                            type={'text'}
                            value={productInformationData.materialUsed}
                            name={'materialUsed'}
                            onFieldChange={onProductInformationChange}
                            placeholder="Ex. Linen"
                            required={true}
                        />

                        <TextInput
                            label={'Location'}
                            type={'text'}
                            value={productInformationData.location}
                            name={'location'}
                            onFieldChange={onProductInformationChange}
                            placeholder="Bengaluru"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <TextInput
                            label={'Manufacturing Details'}
                            type={'text'}
                            value={productInformationData.manufacturingDetails}
                            name={'manufacturingDetails'}
                            onFieldChange={onProductInformationChange}
                            placeholder="Ex. Xyzzy"
                            required={true}
                        />

                        <TextInput
                            label={'Certifications'}
                            type={'text'}
                            value={productInformationData.certifications}
                            name={'certifications'}
                            onFieldChange={onProductInformationChange}
                            placeholder="Ex: ISO 9000"
                            required={true}
                        />
                    </div>
                </div>

                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-xl font-semibold text-primary-500">Product Attribute</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-6">
                        <TextInput
                            label={'Attributes'}
                            type={'text'}
                            value={productAttributeData.attributes}
                            name={'attributes'}
                            onFieldChange={onProductAttributeChange}
                            placeholder="Ex. Size"
                            required={true}
                        />

                        <TextInput
                            label={'SKU'}
                            type={'text'}
                            value={productAttributeData.sku}
                            name={'sku'}
                            onFieldChange={onProductAttributeChange}
                            placeholder="Ex. UGG-BB-PUR-06"
                            required={true}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <TextInput
                            label={'Special Features'}
                            type={'text'}
                            value={productAttributeData.specialFeatures}
                            name={'specialFeatures'}
                            onFieldChange={onProductAttributeChange}
                            placeholder="Pure"
                            required={true}
                        />
                    </div>
                </div>
            </div>

            <div className="self-center w-fit flex gap-x-6 mb-16">
                <Button
                    type={'button'}
                    variant={'primary'}
                    outline={true}
                    classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                </Button>
                <Button type={'button'} variant={'primary'} classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    SAVE & UPDATE <i className="fa-regular fa-floppy-disk ml-2"></i>
                </Button>
            </div>
        </>
    );
};

export default AddProduct;
