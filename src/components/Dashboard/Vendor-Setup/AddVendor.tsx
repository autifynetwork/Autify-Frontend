import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Underline from '@/components/ui/Underline';
import Textarea from '@/components/ui/Input/Textarea';
import Button from '@/components/ui/Button';

const AddVendor = () => {
    const [vendorData, setVendorData] = useState({
        name: '',
        phone: '',
        role: '',
        contract: '',
        entityName: '',
        taxDetails: '',
        additionalDetails: '',
    });
    const onVendorFieldChange = (e: { target: { name: any; value: any } }) => {
        setVendorData({ ...vendorData, [e.target.name]: e.target.value });
    };

    const [vendorInformationData, setVendorInformationData] = useState({
        vendorUsername: '',
        vendorPassword: '',
    });
    const onVendorInformationChange = (e: { target: { name: any; value: any } }) => {
        setVendorInformationData({ ...vendorInformationData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="w-full flex gap-8">
                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-xl font-semibold text-primary-500">General Information</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="w-full grid grid-cols-12 gap-x-8">
                        <div className="w-full col-span-9 flex flex-col gap-8 mt-6">
                            <div className="grid grid-cols-2 gap-8">
                                <TextInput
                                    label={'Vendor Name'}
                                    type={'text'}
                                    value={vendorData.name}
                                    name={'name'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. John Doe"
                                    required={true}
                                />

                                <TextInput
                                    label={'Vendor Phone'}
                                    type={'text'}
                                    value={vendorData.phone}
                                    name={'phone'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. +91 000 0000 000"
                                    required={true}
                                />

                                <TextInput
                                    label={'Role'}
                                    type={'text'}
                                    value={vendorData.role}
                                    name={'role'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. Manufacturer"
                                    required={true}
                                />

                                <TextInput
                                    label={'Contract'}
                                    type={'text'}
                                    value={vendorData.contract}
                                    name={'contract'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. Manufacturer Digi Contract - 3M"
                                    required={true}
                                />
                            </div>
                        </div>

                        <div className="col-span-3 flex flex-col justify-center items-center px-10 py-12 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                            <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary-500"></i>
                            <p className="mt-4 text-primary-500 font-semibold">Upload Image</p>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-primary-500">Legal Information</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="w-full grid grid-cols-12 gap-x-8">
                        <div className="w-full col-span-9 flex flex-col gap-8 mt-6">
                            <div className="grid grid-cols-2 gap-8">
                                <TextInput
                                    label={'Vendor Entity Name'}
                                    type={'text'}
                                    value={vendorData.entityName}
                                    name={'entityName'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. John Doe Pvt Ltd"
                                    required={true}
                                />

                                <TextInput
                                    label={'Vendor Tax Details'}
                                    type={'text'}
                                    value={vendorData.taxDetails}
                                    name={'taxDetails'}
                                    onFieldChange={onVendorFieldChange}
                                    placeholder="Ex. +91 000 0000 000"
                                    required={true}
                                />

                                <div className="col-span-2 flex flex-col justify-center items-center px-10 py-12 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary-500"></i>
                                    <p className="mt-4 text-primary-500 font-semibold">Upload Documents</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 flex flex-col justify-center items-end">
                            <Textarea
                                rows={12}
                                label={'Additional Details'}
                                value={vendorData.additionalDetails}
                                name={'additionalDetails'}
                                onFieldChange={onVendorFieldChange}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                                required={true}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex gap-8">
                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100 p-10">
                    <div>
                        <h1 className="text-xl font-semibold text-primary-500">General Information</h1>
                        <Underline color={'blue'} />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mt-6">
                        <TextInput
                            label={'Vendor User Name'}
                            type={'text'}
                            value={vendorInformationData.vendorUsername}
                            name={'vendorUsername'}
                            onFieldChange={onVendorInformationChange}
                            placeholder="Ex. John_Doe"
                            required={true}
                        />

                        <TextInput
                            label={'Vendor Password'}
                            type={'text'}
                            value={vendorInformationData.vendorPassword}
                            name={'vendorPassword'}
                            onFieldChange={onVendorInformationChange}
                            placeholder=".    .    .    .    .    .    .    .    .    .    .    .    ."
                            required={true}
                        />
                    </div>
                </div>
            </div>

            <div className="self-center w-fit flex gap-x-6 mb-16">
                <Button
                    type={'button'}
                    variant={'primary'}
                    outline={true}
                    classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    CLEAR DATA <i className="fa-solid fa-eraser ml-2"></i>
                </Button>
                <Button type={'button'} variant={'primary'} classes={'text-[14px] px-4 py-3 rounded-[3px] shadow-none'}>
                    SAVE & UPDATE <i className="fa-regular fa-floppy-disk ml-2"></i>
                </Button>
            </div>
        </>
    );
};

export default AddVendor;
