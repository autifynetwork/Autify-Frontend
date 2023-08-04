import { useState } from 'react';
import TextInput from '@/components/ui/Input/TextInput';
import PhoneNumber from '@/components/ui/Input/PhoneNumber';
import UploadFile from '@/components/ui/Input/UploadFile';
import Button from '@/components/ui/Button';

const ProfileDetails = () => {
    // Form values
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        businessName: '',
        businessEmail: '',
        cinFile: '',
        businessPANFile: '',
        businessTANFile: '',
        moaFile: '',
    });

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="relative flex flex-col items-center justify-center gap-8 p-10 rounded-[20px] bg-light-100">
            <span className="relative flex items-center justify-center w-[70px] h-[70px] bg-gray-200 rounded-full">
                <i className="fa-solid fa-user-astronaut text-3xl"></i>
            </span>

            <div className="w-full grid grid-cols-2 gap-x-14 gap-y-6">
                <TextInput
                    label={'First Name'}
                    type={'text'}
                    value={formValues.firstName}
                    name={'firstName'}
                    onFieldChange={onFieldChange}
                    placeholder="Your First Name"
                    required={true}
                    variant={'black'}
                />

                <TextInput
                    label={'Last Name'}
                    type={'text'}
                    value={formValues.lastName}
                    name={'lastName'}
                    onFieldChange={onFieldChange}
                    placeholder="Your Last Name"
                    required={true}
                    variant={'black'}
                />

                <TextInput
                    label={'Email'}
                    type={'email'}
                    value={formValues.email}
                    name={'email'}
                    onFieldChange={onFieldChange}
                    placeholder="yourname@email.com"
                    required={true}
                    variant={'black'}
                />

                <PhoneNumber
                    label={'Phone Number'}
                    name={'phoneNumber'}
                    value={formValues.phoneNumber}
                    onFieldChange={onFieldChange}
                />

                <TextInput
                    label={'Business Name'}
                    type={'text'}
                    value={formValues.businessName}
                    name={'businessName'}
                    onFieldChange={onFieldChange}
                    placeholder="Business Name"
                    required={true}
                    variant={'black'}
                />

                <TextInput
                    label={'Business Email'}
                    type={'text'}
                    value={formValues.businessEmail}
                    name={'businessEmail'}
                    onFieldChange={onFieldChange}
                    placeholder="email@business.com"
                    required={true}
                    variant={'black'}
                />

                <UploadFile
                    label={'CIN'}
                    file={formValues.cinFile}
                    name="cinFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'Business PAN'}
                    file={formValues.businessPANFile}
                    name="businessPANFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'Business TAN'}
                    file={formValues.businessTANFile}
                    name="businessTANFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />

                <UploadFile
                    label={'MOA/AOA'}
                    file={formValues.moaFile}
                    name="moaFile"
                    handleFileUpload={handleFileUpload}
                    handleFileCancel={handleFileCancel}
                />
            </div>

            <div className="mt-4">
                <Button variant={'secondary'} type="submit">
                    Submit to Review
                </Button>
            </div>
        </form>
    );
};

export default ProfileDetails;
