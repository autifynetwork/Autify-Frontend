import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/Dashboard/Table';
import Button from '@/components/ui/Button';
import { StatusContext } from '@/store/StatusContextProvider';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_VENDORS, DELETE_VENDOR_MUTATION, UPDATE_VENDOR_MUTATION } from '@/lib/queries/api';

const VendorList = () => {
    const router = useRouter();
    const { setError, setSuccess } = useContext(StatusContext);

    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Vendor Name', 'Vendor Role', 'Status', 'Action'],
        body: [
            {
                serialNumber: 1,
                vendor: { image: '', name: 'Vendor 1', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
            {
                serialNumber: 2,
                vendor: { image: '', name: 'Vendor 2', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
            {
                serialNumber: 3,
                vendor: { image: '', name: 'Vendor 3', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'inactive',
            },
            {
                serialNumber: 4,
                vendor: { image: '', name: 'Vendor 4', contact: '+91 980 7654 321' },
                role: 'DISTRIBUTOR',
                status: 'active',
            },
        ],
    });

    const { loading, error, data } = useQuery(GET_ALL_VENDORS);
    const vendors = data?.getAllVendors;
    useEffect(() => {
        if (error) {
            setError({
                title: 'Something went wrong',
                message: error?.message || 'Please try again',
                showErrorBox: true,
            });
            return;
        }
        if (vendors && vendors.length > 0) {
            setTableData({
                head: ['SL No', 'Vendor Name', 'Vendor Role', 'Status', 'Action'],
                body: vendors.map((vendor: any, index: number) => {
                    return {
                        serialNumber: index + 1,
                        vendor: { image: '', name: vendor.vendorName, contact: vendor.vendorPhone },
                        role: 'DISTRIBUTOR',
                        id: vendor.id,
                        status: vendor.whitelist ? 'active' : 'inactive',
                    };
                }),
            });
        }
    }, [vendors, error]);

    const [deleteVendor] = useMutation(DELETE_VENDOR_MUTATION);
    const handleDeleteVendor = async (vendorId: string) => {
        try {
            const { data } = await deleteVendor({
                variables: { vendorId },
            });

            // Handle the response data here if needed
            console.log('Deleted Vendor:', data.deleteVendor);
            setSuccess({
                title: 'Vendor deleted successfully',
                message: 'Selected vendor has been deleted',
                showSuccessBox: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            // Handle the error if the mutation fails
            console.error('Error deleting vendor:', error.message);
        }
    };

    const [updateVendor] = useMutation(UPDATE_VENDOR_MUTATION);
    const handleUpdateVendor = async (vendorId: string, newVendorData: any) => {
        // let imageUrl = generateRandomString(10);
        try {
            const { data } = await updateVendor({
                variables: {
                    vendorId,
                    vendorName: newVendorData.name,
                    // categoryImgUrl: imageUrl,
                    whitelist: newVendorData.status === 'active' ? true : false,
                },
            });
            if (data?.updateVendor?.id) {
                setSuccess({
                    title: 'Vendor updated successfully',
                    message: 'Selected vendor has been updated',
                    showSuccessBox: true,
                });
            }
        } catch (error) {
            console.error('Error updating vendor:', error.message);
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
            <h3 className="text-xs font-bold mb-6">VENDOR TABLE</h3>

            <Table
                header={
                    <div className="w-full flex justify-between">
                        {/* <TableSearch
                            name={'tableSearchText'}
                            value={tableSearchText}
                            onFieldChange={onSearchTextChange}
                            placeholder={'Search by name or ID...'}
                        /> */}
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
                                onClick={() => router.push('/vendor-setup/add-vendor')}
                                variant={'primary'}
                                classes={'text-xs px-4 py-2 rounded-[4px] shadow-none'}>
                                ADD VENDOR <i className="fa-solid fa-plus ml-2"></i>
                            </Button>
                        </div>
                    </div>
                }
                tableData={tableData}
                setTableData={setTableData}
                ignore={true}
                loading={loading}
                handleDelete={handleDeleteVendor}
                handleUpdate={handleUpdateVendor}
                type={'vendor'}
            />
        </div>
    );
};

export default VendorList;
