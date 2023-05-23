import TextInput from '@/components/ui/Input/TextInput';
import DateSelector from '@/components/ui/Input/DateSelector';
import PhoneNumber from '@/components/ui/Input/PhoneNumber';

const PersonalDetails = ({ formValues, onFieldChange, dob, setDob }: any) => {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
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
                label={'City'}
                type={'text'}
                value={formValues.city}
                name={'city'}
                onFieldChange={onFieldChange}
                placeholder="Kolkata"
                required={true}
                variant={'black'}
            />

            <DateSelector label={'DOB'} startDate={dob} setStartDate={setDob} />

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

            <PhoneNumber label={'Phone Number'} value={formValues.phoneNumber} onFieldChange={onFieldChange} />

            <TextInput
                label={'Job Title'}
                type={'text'}
                value={formValues.jobTitle}
                name={'jobTitle'}
                onFieldChange={onFieldChange}
                placeholder="Chief Whatever Officer"
                required={true}
                variant={'black'}
            />

            <PhoneNumber
                label={'Alternative Phone Number'}
                value={formValues.alternativePhoneNumber}
                onFieldChange={onFieldChange}
            />
        </div>
    );
};

export default PersonalDetails;
