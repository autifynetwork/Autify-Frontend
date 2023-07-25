import { useState } from 'react';
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
    setItemToUpdate,
    editComponent,
    handleUpdate,
}: any) => {
    const tableRowClasses = `py-3`;
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState({ name: '', image: '' });

    const onTableDataChange = (e: boolean, index: number) => {
        setTableData((prevState: any) => {
            const updatedBody = prevState.body.map(async (item: any) => {
                if (item.serialNumber === index + 1) {
                    const updatedData = { ...item, status: e ? 'active' : 'inactive' };
                    await handleUpdate(item.id, updatedData);
                    return updatedData;
                }
                return item;
            });
            return { ...prevState, body: updatedBody };
        });
    };

    if (loading) return <p>Loading...</p>;
    return (
        <div className="flex flex-col rounded-[30px] bg-light-100 pt-5 pb-8">
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
                                    key == 'id' ? null : (
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
                                            ) : key == 'status' ? (
                                                <Toggle
                                                    toggleState={item.status == 'active'}
                                                    setToggleState={(e: boolean) => {
                                                        onTableDataChange(e, index);
                                                    }}
                                                />
                                            ) : null}
                                        </td>
                                    )
                                )}

                                <td className={tableRowClasses}>
                                    <div className="h-full flex gap-x-4 items-center justify-start">
                                        <button
                                            type="button"
                                            onClick={() => {
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

            <EditDetailsModal isOpen={isUpdateModalOpen} setOpen={setUpdateModalOpen} editComponent={editComponent} />
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
