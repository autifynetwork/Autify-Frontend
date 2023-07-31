import { useState, useEffect, useContext } from 'react';
import { StatusContext } from '@/store/StatusContextProvider';
import Table from '@/components/Dashboard/Table';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_ALL_CATEGORIES,
    CREATE_PRODUCTSKU_MUTATION,
    GET_ALL_PRODUCTSKUS,
    // DELETE_PRODUCTSKU_MUTATION,
    // UPDATE_PRODUCTSKU_MUTATION,
} from '@/lib/queries/api';
import { getObjectByName } from '@/utils';
import AddProductSku from './AddProductSku';

const ProductSku = () => {
    const { setError, setSuccess } = useContext(StatusContext);

    const [productSkuData, setProductSkuData] = useState({ name: '', mainCategory: { id: '' } });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === 'mainCategory') {
            setProductSkuData({
                ...productSkuData,
                [e.target.name]: getObjectByName(e.target.value, categories),
            });
            return;
        }
        setProductSkuData({ ...productSkuData, [e.target.name]: e.target.value });
    };

    const [itemToUpdate, setItemToUpdate] = useState({ id: '', name: '', mainCategory: { id: '' } });
    // @ts-ignore
    const onUpdateFieldChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === 'mainCategory') {
            setItemToUpdate({ ...itemToUpdate, [e.target.name]: getObjectByName(e.target.value, categories) });
            return;
        }
        setItemToUpdate({ ...itemToUpdate, [e.target.name]: e.target.value });
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'SKU Details', 'Main Category Name', 'Status', 'Action'],
        body: [
            // { id: 1, name: 'SKU-GG 1', mainCategoryName: 'Main Category 1', status: 'inactive' },
            // { id: 2, name: 'SKU-GG 2', mainCategoryName: 'Main Category 2', status: 'active' },
            // { id: 3, name: 'SKU-GG 3', mainCategoryName: 'Main Category 3', status: 'active' },
            // { id: 4, name: 'SKU-GG 4', mainCategoryName: 'Main Category 4', status: 'inactive' },
        ],
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categories && categories.length > 0) {
            setProductSkuData({ ...productSkuData, mainCategory: categories[0] });
        }
    }, [categories]);
    const { error, data } = useQuery(GET_ALL_CATEGORIES);
    const categoriesData = data?.getAllCategories;
    useEffect(() => {
        if (error) {
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (categoriesData && categoriesData.length > 0) {
            setCategories(
                categoriesData.map((category: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        id: category.id,
                        name: category.categoryName,
                        image: category.categoryImgUrl,
                        status: category.status ? 'active' : 'inactive',
                    };
                })
            );
        }
    }, [categoriesData, error]);

    const [createProductSku] = useMutation(CREATE_PRODUCTSKU_MUTATION);
    const addProductSku = async () => {
        console.log('productSkuData', productSkuData);
        try {
            const result = await createProductSku({
                variables: {
                    attributeName: productSkuData.name,
                    attributeCategoryId: productSkuData.mainCategory.id,
                    status: true,
                },
            });

            if (result?.data?.createProductSku?.ID) {
                setSuccess({
                    title: 'Product attribute added successfully',
                    message: 'Product attribute has been added successfully',
                    showSuccessBox: true,
                });
                setProductSkuData({ name: '', mainCategory: { id: '' } });
            }
            window.location.reload();
        } catch (error) {
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
        }
    };

    const {
        // @ts-ignore
        loading: productSkusLoading,
        error: productSkusError,
        data: productSkusData,
    } = useQuery(GET_ALL_PRODUCTSKUS);
    const productSkus = productSkusData?.productSkus;
    useEffect(() => {
        if (productSkusError) {
            setError({
                title: 'Something went wrong',
                message: productSkusError?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (productSkus && productSkus.length > 0) {
            console.log('productSkus', productSkus);
            setTableData({
                head: ['SL No', 'SKU Details', 'Main Category Name', 'Status', 'Action'],
                body: productSkus?.map((subCategory: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        id: subCategory.id,
                        name: subCategory.subCategoryName,
                        categoryName: subCategory.mainCategory?.categoryName,
                        mainCategory: subCategory.mainCategory,
                        status: subCategory.status ? 'active' : 'inactive',
                    };
                }),
            });
        }
    }, [productSkus, productSkusError]);

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addProductSku();
                }}
                className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <AddProductSku productSkuData={productSkuData} onFieldChange={onFieldChange} categories={categories} />
            </form>

            <Table heading={'PRODUCT SKU TABLE'} tableData={tableData} setTableData={setTableData} />
        </>
    );
};

export default ProductSku;
