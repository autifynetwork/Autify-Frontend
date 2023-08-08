import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';
import Table from '@/components/Dashboard/Table';
import TableSearch from '@/components/Dashboard/TableSearch';

const SendNotifications = () => {
    const [notificationsData, setNotificationsData] = useState({ name: '', segment: '', description: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setNotificationsData({ ...notificationsData, [e.target.name]: e.target.value });
    };

    // @ts-ignore
    const [tableSearchText, setTableSearchText] = useState('');
    // @ts-ignore
    const onSearchTextChange = (e: { target: { name: any; value: any } }) => {
        setTableSearchText(e.target.value);
    };

    const [tableData, setTableData] = useState({
        head: ['SL No', 'Notification Image', 'Notification Title', 'Status', 'Action'],
        body: [{ serialNumber: 1, image: '', name: 'Delivery Schedule', status: 'active' }],
    });

    return (
        <>
            <div className="relative flex flex-col h-fit items-start justify-start gap-8 p-10 rounded-[20px] bg-light-100">
                <div className="w-full grid grid-cols-2 gap-10 mt-2">
                    <TextInput
                        label={'Title'}
                        type={'text'}
                        value={notificationsData.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Change in delivery schedule"
                        required={true}
                    />

                    <TextInput
                        label={'Select Segment'}
                        type={'text'}
                        value={notificationsData.segment}
                        name={'segment'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Manufacturing"
                        required={true}
                    />

                    <Textarea
                        label={'Description'}
                        value={notificationsData.description}
                        name={'description'}
                        onFieldChange={onFieldChange}
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        required={true}
                    />

                    <div className="w-full flex flex-col justify-start">
                        <p className="text-dark-700 font-medium mb-2 text-start">Notification Banner</p>
                        <div className="col-span-1 w-full flex flex-col justify-center items-center px-10 py-10 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                            <i className="fa-solid fa-cloud-arrow-up text-4xl text-primary-500"></i>
                            <p className="mt-4 text-primary-500 font-semibold">Upload Image</p>
                        </div>
                    </div>
                </div>

                <div className="self-end w-fit flex gap-x-6">
                    <Button
                        type={'button'}
                        variant={'primary'}
                        outline={true}
                        classes={'px-4 py-3 rounded-[3px] shadow-none'}>
                        <div className="text-[10px]">
                            CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                        </div>
                    </Button>
                    <Button type={'button'} variant={'primary'} classes={'px-4 py-3 rounded-[3px] shadow-none'}>
                        <div className="text-[10px]">
                            SEND NOTIFICATION <i className="fa-regular fa-floppy-disk ml-2"></i>
                        </div>
                    </Button>
                </div>
            </div>

            <Table
                header={
                    <div className="w-full flex justify-between">
                        <div className="text-sm mt-1">Notifications Table</div>
                        <TableSearch
                            name={'tableSearchText'}
                            value={tableSearchText}
                            onFieldChange={onSearchTextChange}
                            placeholder={'Search by name or ID...'}
                        />
                    </div>
                }
                tableData={tableData}
                setTableData={setTableData}
            />
        </>
    );
};

export default SendNotifications;
