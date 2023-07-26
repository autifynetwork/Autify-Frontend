import { useState, useEffect, useContext } from 'react';
import { StatusContext } from '@/store/StatusContextProvider';
import Table from '@/components/Dashboard/Table';
import { useQuery, useMutation } from '@apollo/client';
import {
    GET_ALL_CATEGORIES,
    CREATE_SUBCATEGORY_MUTATION,
    GET_ALL_SUBCATEGORIES,
    DELETE_SUBCATEGORY_MUTATION,
    UPDATE_SUBCATEGORY_MUTATION,
} from '@/lib/queries/api';
import { getObjectByName } from '@/utils';
import AddSubCategory from './AddSubCategory';

const SubCategories = () => {
    const { setError, setSuccess } = useContext(StatusContext);

    const [subCategoryData, setSubCategoryData] = useState({ name: '', category: { id: '' } });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === 'category') {
            setSubCategoryData({ ...subCategoryData, [e.target.name]: getObjectByName(e.target.value, categories) });
            return;
        }
        setSubCategoryData({ ...subCategoryData, [e.target.name]: e.target.value });
    };

    const [itemToUpdate, setItemToUpdate] = useState({ id: '', name: '', category: { id: '' } });
    const onUpdateFieldChange = (e: { target: { name: any; value: any } }) => {
        if (e.target.name === 'category') {
            setItemToUpdate({ ...itemToUpdate, [e.target.name]: getObjectByName(e.target.value, categories) });
            return;
        }
        setItemToUpdate({ ...itemToUpdate, [e.target.name]: e.target.value });
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Sub Category Name', 'Main Category Name', 'Status', 'Action'],
        body: [
            // { serialNumber: 1, name: 'Category 1', subCategoryName: 'Sub-Category 1', status: 'inactive' },
            // { serialNumber: 2, name: 'Category 2', subCategoryName: 'Sub-Category 2', status: 'active' },
            // { serialNumber: 3, name: 'Category 3', subCategoryName: 'Sub-Category 3', status: 'active' },
            // { serialNumber: 4, name: 'Category 4', subCategoryName: 'Sub-Category 4', status: 'inactive' },
        ],
    });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (categories && categories.length > 0) {
            setSubCategoryData({ ...subCategoryData, category: categories[0] });
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

    const [createSubCategory] = useMutation(CREATE_SUBCATEGORY_MUTATION);
    const addSubCategory = async () => {
        try {
            const result = await createSubCategory({
                variables: {
                    subCategoryName: subCategoryData.name,
                    categoryId: subCategoryData.category.id,
                    status: true,
                },
            });

            if (result?.data?.createSubCategory?.id) {
                setSuccess({
                    title: 'Sub-Category added successfully',
                    message: 'Sub-Category has been added successfully',
                    showSuccessBox: true,
                });
                setSubCategoryData({ name: '', category: { id: '' } });
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
        loading: subCategoriesLoading,
        error: subcategoriesError,
        data: subcategoriesData,
    } = useQuery(GET_ALL_SUBCATEGORIES);
    const subcategories = subcategoriesData?.getAllSubCategories;
    useEffect(() => {
        if (subcategoriesError) {
            setError({
                title: 'Something went wrong',
                message: subcategoriesError?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (subcategories && subcategories.length > 0) {
            setTableData({
                head: ['SL No', 'Sub Category Name', 'Main Category Name', 'Status', 'Action'],
                body: subcategories?.map((subCategory: any, index: number) => {
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
    }, [subcategories, subcategoriesError]);

    const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY_MUTATION);
    const handleUpdateSubCategory = async (subCategoryId: string, newSubCategoryData: any) => {
        try {
            const { data } = await updateSubCategory({
                variables: {
                    subCategoryId, // ID of the subcategory to be updated
                    categoryId: newSubCategoryData.mainCategory.id, // Pass the categoryId variable
                    subCategoryName: newSubCategoryData.name, // Updated subcategory name
                    status: newSubCategoryData.status === 'active', // Convert 'active' to true, else false
                },
            });
            if (data?.updateSubCategory?.id) {
                setSuccess({
                    title: 'Sub-Category updated successfully',
                    message: 'Selected sub-category has been updated',
                    showSuccessBox: true,
                });
            }
            window.location.reload();
        } catch (error) {
            console.error('Error updating category:', error.message);
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    const [deleteSubCategory] = useMutation(DELETE_SUBCATEGORY_MUTATION);
    const handleDeleteSubCategory = async (subCategoryId: string) => {
        try {
            const { data } = await deleteSubCategory({
                variables: { subCategoryId },
            });

            // Handle the response data here if needed
            console.log('Deleted Category:', data.deleteSubCategory);
            setSuccess({
                title: 'Sub-Category deleted successfully',
                message: 'Selected sub-category has been deleted',
                showSuccessBox: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            // Handle the error if the mutation fails
            console.error('Error deleting category:', error.message);
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addSubCategory();
                }}
                className="relative flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                <AddSubCategory
                    subCategoryData={subCategoryData}
                    onFieldChange={onFieldChange}
                    categories={categories}
                />
            </form>

            <Table
                loading={subCategoriesLoading}
                heading={'SUB-CATEGORY TABLE'}
                type={'sub-category'}
                tableData={tableData}
                setTableData={setTableData}
                handleDelete={handleDeleteSubCategory}
                handleUpdate={handleUpdateSubCategory}
                setItemToUpdate={setItemToUpdate}
                editComponent={
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await handleUpdateSubCategory(itemToUpdate.id, itemToUpdate);
                        }}
                        className="relative flex flex-col gap-8 p-10">
                        <AddSubCategory
                            categoryData={subCategoryData}
                            onFieldChange={onFieldChange}
                            categories={categories}
                            handleUpdate={handleUpdateSubCategory}
                            onUpdateFieldChange={onUpdateFieldChange}
                            itemToUpdate={itemToUpdate}
                        />
                    </form>
                }
            />
        </>
    );
};

export default SubCategories;
