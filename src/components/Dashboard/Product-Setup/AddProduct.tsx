import { useState, useContext, useEffect } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Underline from '@/components/ui/Underline';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';
import { StatusContext } from '@/store/StatusContextProvider';
import apolloClient from '@/lib/apollo-client';
import { CREATE_PRODUCT_MUTATION, GET_PRODUCT_BY_ID, UPDATE_PRODUCT_MUTATION } from '@/lib/queries/api';
import { generateRandomString } from '@/utils';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const { setError, setSuccess } = useContext(StatusContext);
    const router = useRouter();

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

    const addProduct = async () => {
        let imageUrl = generateRandomString(10);
        try {
            // if (image) {
            if (imageUrl) {
                // const imageUrl = await uploadImage(image);
                // if (!imageUrl) {
                // setLoading({ status: false, showProgressBar: false, progress: 0 });
                //     return;
                // }
                const result = await apolloClient.mutate({
                    mutation: CREATE_PRODUCT_MUTATION,
                    variables: {
                        productName: productData.name,
                        productDesc: productData.description,
                        unit: parseInt(categoryData.unit),
                        expiryDate: categoryData.expiry,
                        status: true,
                        materialUsed: productInformationData.materialUsed,
                        location: productInformationData.location,
                        manfactDetail: productInformationData.manufacturingDetails,
                        cartificate: productInformationData.certifications,
                        attributes: productAttributeData.attributes,
                        sku: productAttributeData.sku,
                        specialFeature: productAttributeData.specialFeatures,
                    },
                });

                if (result?.data?.createProduct?.id) {
                    setSuccess({
                        title: 'Product added successfully',
                        message: 'Product has been added successfully',
                        showSuccessBox: true,
                    });
                }
                window.location.reload();
            } else {
                setError({
                    title: 'Image is required',
                    message: 'Please upload an image',
                    showErrorBox: true,
                });
            }
        } catch (error) {
            console.log('Error:', error);

            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    const updateProduct = async () => {
        let imageUrl = generateRandomString(10);
        try {
            // if (image) {
            if (imageUrl) {
                // const imageUrl = await uploadImage(image);
                // if (!imageUrl) {
                // setLoading({ status: false, showProgressBar: false, progress: 0 });
                //     return;
                // }
                const result = await apolloClient.mutate({
                    mutation: UPDATE_PRODUCT_MUTATION,
                    variables: {
                        productId: router.query.productId,
                        productName: productData.name,
                        productDesc: productData.description,
                        unit: parseInt(categoryData.unit),
                        expiryDate: categoryData.expiry,
                        status: true,
                        materialUsed: productInformationData.materialUsed,
                        location: productInformationData.location,
                        manfactDetail: productInformationData.manufacturingDetails,
                        cartificate: productInformationData.certifications,
                        attributes: productAttributeData.attributes,
                        sku: productAttributeData.sku,
                        specialFeature: productAttributeData.specialFeatures,
                    },
                });

                if (result?.data?.updateProduct?.id) {
                    setSuccess({
                        title: 'Product updated successfully',
                        message: 'Product has been updated successfully',
                        showSuccessBox: true,
                    });
                }
                window.location.reload();
            } else {
                setError({
                    title: 'Image is required',
                    message: 'Please upload an image',
                    showErrorBox: true,
                });
            }
        } catch (error) {
            console.log('Error:', error);

            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    const getProductData = async () => {
        const result = await apolloClient.query({
            query: GET_PRODUCT_BY_ID,
            variables: {
                productId: router.query.productId,
            },
        });
        const prod = result.data.productById;
        setProductData({ name: prod.productName, description: prod.productDesc });
        setCategoryData({ mainCategory: '', subCategory: '', unit: prod.unit, expiry: prod.expiryDate });
        setProductInformationData({
            materialUsed: prod.materialUsed,
            location: prod.location,
            manufacturingDetails: prod.manfactDetail,
            certifications: prod.cartificate,
        });
        setProductAttributeData({
            attributes: prod.attributes,
            sku: prod.sku,
            specialFeatures: prod.specialFeature,
        });
    };

    useEffect(() => {
        if (router.query.productId) {
            getProductData();
        }
    }, [router.query]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (router.query.productId) {
                    updateProduct();
                } else {
                    addProduct();
                }
            }}
            className="relative flex flex-col gap-10">
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
                    onClick={() => {
                        setProductData({ name: '', description: '' });
                        setCategoryData({ mainCategory: '', subCategory: '', unit: '', expiry: '' });
                        setProductInformationData({
                            materialUsed: '',
                            location: '',
                            manufacturingDetails: '',
                            certifications: '',
                        });
                        setProductAttributeData({ attributes: '', sku: '', specialFeatures: '' });
                    }}
                    variant={'primary'}
                    outline={true}
                    classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                </Button>
                <Button type={'submit'} variant={'primary'} classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    SAVE & UPDATE <i className="fa-regular fa-floppy-disk ml-2"></i>
                </Button>
            </div>
        </form>
    );
};

export default AddProduct;
