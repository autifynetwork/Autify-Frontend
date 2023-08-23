import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Toggle from '@/components/ui/Toggle';
import EditDetailsModal from '@/components/Dashboard/Category-Setup/EditDetailsModal';
import DeleteModal from '@/components/Dashboard/Category-Setup/DeleteModal';
import { isValidURL } from '@/utils';

const Table = ({
    loading,
    header,
    heading,
    type,
    tableData,
    setTableData,
    handleDelete,
    setItemToUpdate = () => {},
    editComponent = null,
    handleUpdate = () => {},
    ignore = false,
    tableType,
}: any) => {
    const router = useRouter();
    const tableRowClasses = `py-3`;
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ name: '', image: '' });

    const onTableDataChange = (e: boolean, index: number) => {
        setTableData((prevState: any) => {
            const updatedBody = prevState.body.map((item: any) => {
                if (item.serialNumber === index + 1) {
                    const updatedData = { ...item, status: e ? 'active' : 'inactive' };
                    if (!ignore) handleUpdate(item.id, updatedData);
                    return updatedData;
                }
                return item;
            });
            return { ...prevState, body: updatedBody };
        });
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div
            className={
                'flex flex-col rounded-[30px] bg-light-100 pt-5 pb-8 ' +
                (tableType == 'ticket' || tableType == 'trackOrders' ? 'h-[80vh]' : '')
            }>
            <div className="flex justify-between items-center px-10">
                {heading && <span className="text-xs font-semibold">{heading}</span>} {header}
            </div>

            <table id="myTable" className="w-full table mt-4">
                <thead className="bg-[#F1F3F9]">
                    <tr>
                        {tableData.head &&
                            tableData.head.map((item: any, index: number) => (
                                <th
                                    key={index}
                                    className={
                                        'py-3 text-sm font-normal text-[#8898AA] text-start ' +
                                        (index == 0 ? 'pl-10' : '')
                                    }>
                                    {item}
                                </th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {tableData.body && tableData.body.length > 0 ? (
                        tableData.body.map((item: any, index: number) => (
                            <tr key={item.serialNumber} className={index % 2 == 0 ? 'bg-white' : 'bg-[#F7FAFC]'}>
                                {Object.keys(item).map((key, idx) =>
                                    key == 'id' || key == 'mainCategory' ? null : (
                                        <td key={key} className={tableRowClasses + (idx == 0 ? ' pl-10' : '')}>
                                            {key == 'serialNumber' ? (
                                                item.serialNumber
                                            ) : key == 'image' ? (
                                                item.image && isValidURL(item.image) ? (
                                                    <Image src={item.image} alt="category image" />
                                                ) : (
                                                    <div
                                                        className={`bg-primary-300 opacity-40 w-12 h-12 flex items-center justify-center rounded-lg text-light-100 text-xl`}>
                                                        <i className="fa-solid fa-image"></i>
                                                    </div>
                                                )
                                            ) : key == 'name' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.name}
                                                </div>
                                            ) : key == 'categoryName' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.categoryName}
                                                </div>
                                            ) : key == 'subCategoryName' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.subCategoryName}
                                                </div>
                                            ) : key == 'mainCategoryName' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.mainCategoryName}
                                                </div>
                                            ) : key == 'subject' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.subject}
                                                </div>
                                            ) : key == 'vendor' ? (
                                                <div className="w-fit flex gap-x-4 justify-center items-center text-[13px] font-semibold">
                                                    {item.vendor.image && isValidURL(item.vendor.image) ? (
                                                        <Image src={item.vendor.image} alt="category image" />
                                                    ) : (
                                                        <div
                                                            className={`bg-primary-300 opacity-40 w-12 h-12 flex items-center justify-center rounded-full text-light-100 text-xl`}>
                                                            <i className="fa-solid fa-image"></i>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">
                                                        {item.vendor.name}
                                                        <span className="font-light">
                                                            Contact: {item.vendor.contact}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : key == 'product' ? (
                                                <div className="w-fit flex gap-x-4 justify-center items-center text-[13px] font-semibold">
                                                    {item.product.image && isValidURL(item.product.image) ? (
                                                        <Image src={item.product.image} alt="category image" />
                                                    ) : (
                                                        <div
                                                            className={`bg-primary-300 opacity-40 w-12 h-12 flex items-center justify-center rounded-full text-light-100 text-xl`}>
                                                            <i className="fa-solid fa-image"></i>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-col">{item.product.name}</div>
                                                </div>
                                            ) : key == 'sku' ? (
                                                <div className="rounded-md w-fit text-[13px] font-semibold">
                                                    {item.sku}
                                                </div>
                                            ) : key == 'lastStatusUpdate' ? (
                                                <div className="rounded-md w-fit text-[13px] font-semibold">
                                                    {item.lastStatusUpdate}
                                                </div>
                                            ) : key == 'currentJourneyPoint' ? (
                                                <div className="rounded-md w-fit text-[13px] font-semibold">
                                                    {item.currentJourneyPoint}
                                                </div>
                                            ) : key == 'overallStatus' ? (
                                                <div
                                                    className={
                                                        'rounded-md px-5 py-1 w-fit text-[13px] font-semibold ' +
                                                        (item.overallStatus == 'DELAYED'
                                                            ? 'bg-red-300'
                                                            : 'bg-green-300')
                                                    }>
                                                    {item.overallStatus}
                                                </div>
                                            ) : key == 'role' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.role}
                                                </div>
                                            ) : key == 'status' ? (
                                                <Toggle
                                                    toggleState={item.status == 'active'}
                                                    setToggleState={(e: boolean) => {
                                                        onTableDataChange(e, index);
                                                    }}
                                                />
                                            ) : key == 'ticketStatus' ? (
                                                <div
                                                    className={
                                                        'rounded-md w-fit text-[13px] font-semibold' +
                                                        (item.ticketStatus == 'OPEN'
                                                            ? ' text-green-500'
                                                            : ' text-red-500')
                                                    }>
                                                    {item.ticketStatus}
                                                </div>
                                            ) : key == 'priority' ? (
                                                <div className="rounded-md px-5 py-1 bg-[#E1F3FFD4] w-fit text-[13px] font-semibold">
                                                    {item.priority}
                                                </div>
                                            ) : key == 'createdDate' ? (
                                                <div className="rounded-md w-fit text-[13px] font-semibold">
                                                    {item.createdDate}
                                                </div>
                                            ) : null}
                                        </td>
                                    )
                                )}

                                {tableType == 'trackOrders' && (
                                    <td className={tableRowClasses}>
                                        <div className="h-full flex gap-x-4 items-center justify-start">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    router.push(`/orders/track/product-id`);
                                                }}
                                                className="bg-[#E1F3FFD4] py-2 px-4 rounded-md text-primary-500 hover:text-primary-600 transition duration-300 text-sm">
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </div>
                                    </td>
                                )}

                                {tableType !== 'ticket' && tableType !== 'trackOrders' && (
                                    <td className={tableRowClasses}>
                                        <div className="h-full flex gap-x-4 items-center justify-start">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (type == 'product') {
                                                        router.push(`/product-setup/edit-product?productId=${item.id}`);
                                                        return;
                                                    }
                                                    if (type == 'vendor') {
                                                        router.push(`/vendor-setup/edit-vendor?vendorId=${item.id}`);
                                                        return;
                                                    }
                                                    setItemToUpdate(item);
                                                    setUpdateModalOpen(true);
                                                }}
                                                className="bg-[#E1F3FFD4] py-2 px-4 rounded-md text-primary-500 hover:text-primary-600 transition duration-300 text-sm">
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setItemToDelete(item);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="bg-[#E1F3FFD4] py-2 px-4 rounded-md text-primary-500 hover:text-error-500 transition duration-300 text-sm">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="text-center text-sm pt-8 text-gray-500" colSpan={5}>
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <EditDetailsModal
                isOpen={isUpdateModalOpen}
                setOpen={setUpdateModalOpen}
                editComponent={editComponent}
                type={type}
            />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                setOpen={setDeleteModalOpen}
                title={'Delete'}
                itemToDelete={itemToDelete}
                confirmation="Are you sure you want to delete this"
                type={type}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default Table;
