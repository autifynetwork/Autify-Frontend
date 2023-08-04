import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';
import Textarea from '@/components/ui/Input/Textarea';

const FeatureRequestDetails = () => {
    // Form values
    const [formValues, setFormValues] = useState({
        vendorName: '',
        vendorPhone: '',
        category: '',
        description: '',
        priority: '',
    });

    const onFieldChange = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="relative flex flex-col items-start justify-center gap-8 p-10 rounded-[20px] bg-light-100">
                <div>
                    <h1 className="text-xl text-primary-500 font-semibold">Feature Request</h1>
                    <Underline color={'blue'} />
                </div>

                <div className="w-full grid grid-cols-2 gap-x-14 gap-y-6">
                    <TextInput
                        label={'Vendor Name'}
                        type={'text'}
                        value={formValues.vendorName}
                        name={'vendorName'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex. John Doe"
                        required={true}
                    />

                    <TextInput
                        label={'Vendor Phone'}
                        type={'text'}
                        value={formValues.vendorPhone}
                        name={'vendorPhone'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex: +91 000 0000 000"
                        required={true}
                    />

                    <TextInput
                        label={'Category'}
                        type={'text'}
                        value={formValues.category}
                        name={'category'}
                        onFieldChange={onFieldChange}
                        placeholder="Product Setup"
                        required={true}
                    />

                    <div className="row-span-2">
                        <Textarea
                            rows={6}
                            label={'Description'}
                            value={formValues.description}
                            name={'description'}
                            onFieldChange={onFieldChange}
                            placeholder="Lorem ipsum."
                            required={true}
                        />
                    </div>

                    <TextInput
                        label={'Priority'}
                        type={'text'}
                        value={formValues.priority}
                        name={'priority'}
                        onFieldChange={onFieldChange}
                        placeholder="Ex: Critical"
                        required={true}
                    />
                </div>

                <div className="relative w-full flex flex-col gap-8 rounded-[20px] bg-light-100">
                    <div className="w-full flex flex-col justify-center items-center px-10 py-8 rounded-md border-2 border-primary-400 border-dashed cursor-pointer">
                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary-500"></i>
                        <p className="mt-4 text-primary-500 font-semibold">Upload Reference</p>
                    </div>
                </div>
            </form>

            <div className="self-center w-fit flex gap-x-6 mb-16">
                <Button
                    type={'button'}
                    variant={'primary'}
                    outline={true}
                    classes={'text-[10px] px-4 py-3 rounded-[3px] shadow-none'}>
                    CLEAR DATA <i className="fa-solid fa-eraser ml-3"></i>
                </Button>
                <Button type={'button'} variant={'primary'} classes={'text-[10px] px-4 py-3 rounded-[3px] shadow-none'}>
                    SUBMIT <i className="fa-solid fa-paper-plane ml-3"></i>
                </Button>
            </div>
        </>
    );
};

export default FeatureRequestDetails;
