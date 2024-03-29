import { useState, useContext } from 'react';
import Modal from '@/components/ui/Modal';
import Underline from '@/components/ui/Underline';
import TextInput from '@/components/ui/Input/TextInput';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';
import { StatusContext } from '@/store/StatusContextProvider';
import apolloClient from '@/lib/apollo-client';
import { CREATE_BOM_MUTATION } from '@/lib/queries/api';

const AddBillOfMaterialsModal = ({ isOpen, setOpen, title }: any) => {
    const { setError, setSuccess } = useContext(StatusContext);

    const [bomData, setBomData] = useState({
        title: '',
        description: '',
        vendor: '',
        dueDate: '',
        instructionsToVendors: '',
        remarks: '',
    });
    const onFieldChange = (e: { target: { name: any; value: any } }) => {
        setBomData({ ...bomData, [e.target.name]: e.target.value });
    };

    const addBom = async () => {
        try {
            const result = await apolloClient.mutate({
                mutation: CREATE_BOM_MUTATION,
                variables: {
                    title: bomData.title,
                    description: bomData.description,
                    vendorId: bomData.vendor,
                    // TODO: change
                    // dueDate: bomData.dueDate,
                    dueDate: '2023-06-15T10:00:00Z',
                    instructions: bomData.instructionsToVendors,
                    remarks: bomData.remarks,
                },
            });

            if (result?.data?.populateBom?.id) {
                setSuccess({
                    title: 'BOM added successfully',
                    message: 'BOM has been added successfully',
                    showSuccessBox: true,
                });
            }
            window.location.reload();
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

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            content={
                <div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await addBom();
                            setOpen(false);
                        }}
                        className="w-full flex flex-col justify-center">
                        <div className="grid grid-cols-2 justify-center items-center">
                            <div className="w-full flex flex-col justify-start items-start gap-y-6">
                                <div>
                                    <h1 className="text-xl text-start font-semibold text-primary-500">
                                        Add Bill of Material
                                    </h1>
                                    <Underline color={'blue'} />
                                </div>
                                <div className="w-[90%] flex flex-col gap-8 mt-6">
                                    <TextInput
                                        label={'BOM Title'}
                                        type={'text'}
                                        value={bomData.title}
                                        name={'title'}
                                        onFieldChange={onFieldChange}
                                        placeholder="Ex. Yarn"
                                        required={true}
                                    />

                                    <Textarea
                                        label={'BOM Description'}
                                        value={bomData.description}
                                        name={'description'}
                                        onFieldChange={onFieldChange}
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                                        required={true}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col justify-start items-start gap-y-6">
                                <div>
                                    <h1 className="text-xl text-start font-semibold text-primary-500">
                                        Vendor & Timelines
                                    </h1>
                                    <Underline color={'blue'} />
                                </div>
                                <div className="w-full grid grid-cols-2 gap-y-8 gap-x-4 mt-6">
                                    <TextInput
                                        label={'Select Vendor'}
                                        type={'text'}
                                        value={bomData.vendor}
                                        name={'vendor'}
                                        onFieldChange={onFieldChange}
                                        placeholder="Ex. XYZ Yarn LLC"
                                        required={true}
                                    />

                                    <TextInput
                                        label={'Select Due-Date'}
                                        type={'text'}
                                        value={bomData.dueDate}
                                        name={'dueDate'}
                                        onFieldChange={onFieldChange}
                                        placeholder="{{Date-View}}"
                                        required={true}
                                    />

                                    <Textarea
                                        label={'Instructions to Vendors'}
                                        value={bomData.instructionsToVendors}
                                        name={'instructionsToVendors'}
                                        onFieldChange={onFieldChange}
                                        placeholder="Ex: Abc process to be followed"
                                        required={true}
                                    />

                                    <Textarea
                                        label={'Remarks (Optional)'}
                                        value={bomData.remarks}
                                        name={'remarks'}
                                        onFieldChange={onFieldChange}
                                        placeholder=""
                                        required={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="self-center w-fit flex gap-x-6 mt-12">
                            <Button
                                type={'button'}
                                variant={'primary'}
                                outline={true}
                                classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                                CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                            </Button>
                            <Button
                                type={'submit'}
                                variant={'primary'}
                                classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                                SAVE & UPDATE <i className="fa-regular fa-floppy-disk ml-2"></i>
                            </Button>
                        </div>
                    </form>
                </div>
            }
            onClose={() => {
                setOpen(false);
            }}></Modal>
    );
};

export default AddBillOfMaterialsModal;
