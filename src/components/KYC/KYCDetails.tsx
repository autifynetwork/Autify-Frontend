import { useState } from 'react';
import KycSidebar from '@/components/KYC/Sidebar';
import PersonalDetails from '@/components/KYB/PersonalDetails';
import BusinessDetails from '@/components/KYB/BusinessDetails';
import UploadDocuments from '@/components/KYB/UploadDocuments';
import ActionButtons from '@/components/KYB/ActionButtons';

const KYCDetails = () => {
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
        <div className="relative w-full h-full flex flex-col gap-x-6 md:flex-row rounded-xl">
            <KycSidebar step={step} setStep={setStep} />

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (step == lastStep) submitHandler();
                    else nextStep();
                }}
                className="basis-full md:basis-4/5 flex flex-col h-fit pt-16 pb-20 md:px-10 px-8 gap-y-6 bg-light-100 border-[0.5px] border-dark-700 rounded-xl">
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
    );
};

export default KYCDetails;
