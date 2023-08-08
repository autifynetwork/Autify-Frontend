import { useState } from 'react';
import Underline from '@/components/ui/Underline';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import BomCard from '@/components/Dashboard/OrderManagement/BomCard';
import AddBillOfMaterialsModal from '@/components/Dashboard/OrderManagement/AddBillOfMaterialsModal';

const CreateOrder = () => {
    const [orderData, setOrderData] = useState({ name: '', priority: '' });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const [addBillOfMaterialsModalOpen, setAddBillOfMaterialsModalOpen] = useState(false);

    return (
        <>
            <div className="relative flex flex-col h-fit items-start justify-start gap-8 p-10 rounded-[20px] bg-light-100">
                <div>
                    <h1 className="text-2xl font-semibold">Create Order</h1>
                    <Underline />
                </div>

                <div className="w-full grid grid-cols-2 gap-10 mt-6">
                    <TextInput
                        label={'Select Product'}
                        type={'text'}
                        value={orderData.name}
                        name={'name'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. Polo T-Shirt - SKU 000-1234-000"
                        required={true}
                    />

                    <TextInput
                        label={'Select Priority'}
                        type={'text'}
                        value={orderData.priority}
                        name={'priority'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. High"
                        required={true}
                    />
                </div>

                <div className="flex self-end">
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-y-10">
                <div className="w-full grid grid-cols-3 gap-10">
                    <div
                        onClick={() => {
                            setAddBillOfMaterialsModalOpen(true);
                        }}
                        className="bg-light-100 rounded-lg font-semibold px-4 pt-4 pb-10 flex flex-col gap-y-4 cursor-pointer">
                        <div className="w-full flex justify-between">
                            Bill of Materials
                            <span>
                                <i className="fa-solid fa-plus"></i>
                            </span>
                        </div>
                        <BomCard
                            heading={'Nulla volutpat aliquam velit'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'OZ'}
                            type={1}
                        />
                        <BomCard
                            heading={'Facilisis in pretium nisl aliquet'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'LE'}
                            type={2}
                            timeContent={<p className="text-xs text-red-500">Two days ago</p>}
                        />
                        <BomCard
                            heading={'Eget porttitor lorem'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'ME'}
                            type={3}
                        />
                    </div>

                    <div className="bg-light-100 rounded-lg font-semibold px-4 pt-4 pb-10 flex flex-col gap-y-4">
                        <div className="w-full flex justify-between">Vendors</div>
                        <BomCard
                            heading={'Eget porttitor lorem'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'AM'}
                            type={4}
                            timeContent={<p className="text-xs text-indigo-500">Today</p>}
                        />
                        <BomCard
                            heading={'Consectetur adipiscing elit'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'OZ'}
                            type={1}
                            timeContent={<p className="text-xs text-green-500">In three days</p>}
                        />
                        <BomCard
                            heading={'Nulla volutpat aliquam velit'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'LE'}
                            type={2}
                            timeContent={<p className="text-xs text-green-500">August 21</p>}
                        />
                    </div>

                    <div className="bg-light-100 rounded-lg font-semibold px-4 pt-4 pb-10 flex flex-col gap-y-4">
                        <div className="w-full flex justify-between">Remarks</div>
                        <BomCard
                            heading={'Ac tristique libero volutpat at'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'LE'}
                            type={2}
                            timeContent={<p className="text-xs text-gray-400">A week ago</p>}
                        />
                        <BomCard
                            heading={'Phasellus iaculis neque'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'OZ'}
                            type={1}
                            timeContent={<p className="text-xs text-gray-400">Last Tuesday</p>}
                        />
                        <BomCard
                            heading={'Facilisis in pretium nisl aliquet'}
                            content={
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat ar ..'
                            }
                            initials={'AM'}
                            type={4}
                        />
                    </div>
                </div>

                <div className="self-center w-fit flex gap-x-6 mb-16">
                    <Button
                        type={'button'}
                        variant={'primary'}
                        classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                        Save & Notify Vendors
                    </Button>
                </div>
            </div>

            <AddBillOfMaterialsModal isOpen={addBillOfMaterialsModalOpen} setOpen={setAddBillOfMaterialsModalOpen} />
        </>
    );
};

export default CreateOrder;
