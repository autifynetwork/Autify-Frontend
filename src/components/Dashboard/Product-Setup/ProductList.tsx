import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/Dashboard/Table';
import Button from '@/components/ui/Button';
import { StatusContext } from '@/store/StatusContextProvider';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_PRODUCTS, DELETE_PRODUCT_MUTATION, UPDATE_PRODUCT_MUTATION } from '@/lib/queries/api';

const ProductList = () => {
    const router = useRouter();
    const { setError, setSuccess } = useContext(StatusContext);

    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Product Image', 'Product Name', 'Status', 'Action'],
        body: [
            // { serialNumber: 1, image: '', name: 'Product 1', status: 'active' },
            // { serialNumber: 2, image: '', name: 'Product 2', status: 'active' },
            // { serialNumber: 3, image: '', name: 'Product 3', status: 'inactive' },
            // { serialNumber: 4, image: '', name: 'Product 4', status: 'active' },
        ],
    });

    const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
    const products = data?.productList;
    useEffect(() => {
        if (error) {
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (products && products.length > 0) {
            setTableData({
                head: ['SL No', 'Product Image', 'Product Name', 'Status', 'Action'],
                body: products.map((product: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        image: '',
                        name: product.productName,
                        id: product.id,
                        status: product.status ? 'active' : 'inactive',
                    };
                }),
            });
        }
    }, [products, error]);

    const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION);
    const handleDeleteProduct = async (productId: string) => {
        try {
            const { data } = await deleteProduct({
                variables: { productId },
            });

            // Handle the response data here if needed
            console.log('Deleted Product:', data.deleteProduct);
            setSuccess({
                title: 'Product deleted successfully',
                message: 'Selected product has been deleted',
                showSuccessBox: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            // Handle the error if the mutation fails
            console.error('Error deleting product:', error.message);
        }
    };

    const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);
    const handleUpdateProduct = async (productId: string, newProductData: any) => {
        // let imageUrl = generateRandomString(10);
        try {
            const { data } = await updateProduct({
                variables: {
                    productId,
                    productName: newProductData.name,
                    // categoryImgUrl: imageUrl,
                    status: newProductData.status === 'active' ? true : false,
                },
            });
            if (data?.updateProduct?.id) {
                setSuccess({
                    title: 'Product updated successfully',
                    message: 'Selected product has been updated',
                    showSuccessBox: true,
                });
            }
        } catch (error) {
            console.error('Error updating product:', error.message);
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
    };

    return (
        <div>
            <h3 className="text-xs font-bold mb-6">PRODUCT TABLE</h3>

            <Table
                header={
                    <div className="w-full flex justify-between">
                        <div></div>

                        <div className="w-fit flex gap-x-4">
                            {/* <Button
                                type={'button'}
                                variant={'primary'}
                                outline={true}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                Export to CSV <i className="fa-solid fa-download ml-2"></i>
                            </Button> */}
                            <Button
                                type={'button'}
                                onClick={() => router.push('/product-setup/add-product')}
                                variant={'primary'}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                ADD PRODUCT <i className="fa-solid fa-plus ml-2"></i>
                            </Button>
                        </div>
                    </div>
                }
                loading={loading}
                tableData={tableData}
                setTableData={setTableData}
                handleDelete={handleDeleteProduct}
                handleUpdate={handleUpdateProduct}
                type={'product'}
            />
        </div>
    );
};

export default ProductList;
