import { Fragment, useState } from 'react';
const { Transition } = require('@headlessui/react');
import Image from 'next/image';
import Sidebar from '@/components/KYB/Sidebar';
import PersonalDetails from '@/components/KYB/PersonalDetails';
import BusinessDetails from '@/components/KYB/BusinessDetails';
import UploadDocuments from '@/components/KYB/UploadDocuments';
import ActionButtons from '@/components/KYB/ActionButtons';

export default function KYBModal({ isOpen = false, setOpen }: any) {
    const closeModal = () => {
        setOpen(false);
    };

    const [step, setStep] = useState(1);
    const lastStep = 3;

    // Continue to next step
    const nextStep = () => {
        setStep((currStep) => currStep + 1);
    };

    // Revert to previous step
    const prevStep = () => {
        if (step == 1) return;
        setStep((currStep) => currStep - 1);
    };

    // Form values
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        phoneNumber: '',
        jobTitle: '',
        alternativePhoneNumber: '',
        cin: '',
        businessPan: '',
        hqLocation: '',
        website: '',
        industry: '',
        businessType: '',
        businessSize: '',
        cinFile: '',
        businessPANFile: '',
        businessTANFile: '',
        moaFile: '',
    });
    const [dob, setDob] = useState(new Date());
    const [yearOfIncorporation, setYearOfIncorporation] = useState(new Date());
    const onFieldChange = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const handleFileUpload = async (e: any) => {
        // If file size is > 10 MB show error box
        if (e.target.files[0] && e.target.files[0].size > 10000000) {
            alert('File too large: Uploaded file should be less than 10 MB');
            return;
        }
        if (e.target.files[0]) {
            setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
        }
    };
    const handleFileCancel = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: '' });
    };

    const submitHandler = () => {
        // setLoading({ status: true });
        // dispatch(createTeam(formValues));
    };

    const step1Values = { formValues, onFieldChange, dob, setDob };
    const step2Values = { formValues, onFieldChange, yearOfIncorporation, setYearOfIncorporation };
    const step3Values = { formValues, handleFileUpload, handleFileCancel };

    return (
        <>
            <Transition show={isOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-all duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-all duration-200"
                    leaveTo="opacity-0"
                    leaveFrom="opacity-100">
                    <div
                        style={{ zIndex: '50' }}
                        onClick={() => {}}
                        className="w-screen h-screen left-0 top-0 bg-black/10 backdrop-blur-sm fixed"
                    />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition-all duration-200"
                    enterFrom="opacity-0 scale-75"
                    enterTo="opacity-100 scale-100"
                    leave="transition-all duration-200"
                    leaveTo="opacity-0 scale-75"
                    leaveFrom="opacity-100 scale-100">
                    <div
                        style={{ zIndex: '60' }}
                        className="flex left-0 top-0 justify-center items-center h-full w-full fixed rounded-xl">
                        <div className={`w-full bg-light-100 border border-[#707070] rounded-xl ${'max-w-[80rem]'}`}>
                            <div className="relative w-full flex justify-between items-center rounded-xl">
                                <Image
                                    className="cursor-pointer top-4 right-4 absolute z-[100]"
                                    onClick={() => closeModal()}
                                    src={'/assets/login/close-circle-outline.svg'}
                                    alt="close"
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className="relative w-full h-full flex flex-col md:flex-row rounded-xl">
                                <Sidebar step={step} setStep={setStep} />

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (step == lastStep) submitHandler();
                                        else nextStep();
                                    }}
                                    className="basis-full md:basis-4/5 flex flex-col pt-16 pb-24 md:px-16 px-8 gap-y-6 bg-light-100 rounded-xl">
                                    {step == 1 ? (
                                        <PersonalDetails {...step1Values} />
                                    ) : step == 2 ? (
                                        <BusinessDetails {...step2Values} />
                                    ) : (
                                        <UploadDocuments {...step3Values} />
                                    )}

                                    <ActionButtons step={step} lastStep={lastStep} prevStep={prevStep} />
                                </form>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Transition>
        </>
    );
}
