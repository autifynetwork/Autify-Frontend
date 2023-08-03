import { useState, useEffect, useContext } from 'react';
import { StatusContext } from '@/store/StatusContextProvider';
import Table from '@/components/Dashboard/Table';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_ALL_CATEGORIES,
    CREATE_PRODUCTATTRIBUTE_MUTATION,
    GET_ALL_PRODUCTATTRIBUTES,
    // UPDATE_PRODUCTATTRIBUTE_MUTATION,
    // DELETE_PRODUCTATTRIBUTE_MUTATION,
} from '@/lib/queries/api';
import { getObjectByName } from '@/utils';
import AddProductAttribute from './AddProductAttribute';

const ProductAttribute = () => {
    const { setError, setSuccess } = useContext(StatusContext);

    const [productAttributeData, setProductAttributeData] = useState({ name: '', mainCategory: { id: '' } });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === 'mainCategory') {
            setProductAttributeData({
                ...productAttributeData,
                [e.target.name]: getObjectByName(e.target.value, categories),
            });
            return;
        }
        setProductAttributeData({ ...productAttributeData, [e.target.name]: e.target.value });
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
        head: ['SL No', 'Attribute Name', 'Main Category Name', 'Status', 'Action'],
        body: [
            //     { serialNumber: 1, name: 'Size 1', mainCategoryName: 'Main Category 1', status: 'inactive' },
            //     { serialNumber: 2, name: 'Size 2', mainCategoryName: 'Main Category 2', status: 'active' },
            //     { serialNumber: 3, name: 'Size 3', mainCategoryName: 'Main Category 3', status: 'active' },
            //     { serialNumber: 4, name: 'Size 4', mainCategoryName: 'Main Category 4', status: 'inactive' },
        ],
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categories && categories.length > 0) {
            setProductAttributeData({ ...productAttributeData, mainCategory: categories[0] });
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

    const [createProductAttribute] = useMutation(CREATE_PRODUCTATTRIBUTE_MUTATION);
    const addProductAttribute = async () => {
        console.log('productAttributeData', productAttributeData);
        try {
            const result = await createProductAttribute({
                variables: {
                    attributeName: productAttributeData.name,
                    attributeCategoryId: productAttributeData.mainCategory.id,
                    status: true,
                },
            });

            if (result?.data?.createProductAttribute?.attributeName) {
                setSuccess({
                    title: 'Product attribute added successfully',
                    message: 'Product attribute has been added successfully',
                    showSuccessBox: true,
                });
                setProductAttributeData({ name: '', mainCategory: { id: '' } });
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
        loading: productAttributesLoading,
        error: productAttributesError,
        data: productAttributesData,
    } = useQuery(GET_ALL_PRODUCTATTRIBUTES);
    const productAttributes = productAttributesData?.productAttributes;
    useEffect(() => {
        if (productAttributesError) {
            setError({
                title: 'Something went wrong',
                message: productAttributesError?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (productAttributes && productAttributes.length > 0) {
            console.log('productAttributes', productAttributes);
            setTableData({
                head: ['SL No', 'Attribute Name', 'Main Category Name', 'Status', 'Action'],
                body: productAttributes?.map((attribute: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        name: attribute.attributeName,
                        categoryName: attribute.attributeCategory?.categoryName,
                        mainCategory: attribute.attributeCategory,
                        status: attribute.status ? 'active' : 'inactive',
                    };
                }),
            });
        }
    }, [productAttributes, productAttributesError]);

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addProductAttribute();
                }}
                className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <AddProductAttribute
                    productAttributeData={productAttributeData}
                    onFieldChange={onFieldChange}
                    categories={categories}
                />
            </form>

            <Table
                loading={productAttributesLoading}
                heading={'PRODUCT ATTRIBUTES TABLE'}
                type={'product-attribute'}
                tableData={tableData}
                setTableData={setTableData}
                // handleDelete={handleDeleteSubCategory}
                // handleUpdate={handleUpdateSubCategory}
                setItemToUpdate={setItemToUpdate}
                editComponent={
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            // await handleUpdateSubCategory(itemToUpdate.id, itemToUpdate);
                        }}
                        className="relative flex flex-col gap-8 p-10">
                        {/* <AddSubCategory
                            categoryData={subCategoryData}
                            onFieldChange={onFieldChange}
                            categories={categories}
                            handleUpdate={handleUpdateSubCategory}
                            onUpdateFieldChange={onUpdateFieldChange}
                            itemToUpdate={itemToUpdate}
                        /> */}
                    </form>
                }
            />
        </>
    );
};

export default ProductAttribute;
