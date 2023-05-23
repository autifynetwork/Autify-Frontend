import TextInput from '@/components/ui/Input/TextInput';
import DateSelector from '@/components/ui/Input/DateSelector';

const BusinessDetails = ({ formValues, onFieldChange, yearOfIncorporation, setYearOfIncorporation }: any) => {
    return (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <TextInput
                label={'CIN'}
                type={'text'}
                value={formValues.cin}
                name={'cin'}
                onFieldChange={onFieldChange}
                placeholder="Your CIN"
                required={true}
                variant={'black'}
            />

            <TextInput
                label={'Business PAN'}
                type={'text'}
                value={formValues.businessPan}
                name={'businessPan'}
                onFieldChange={onFieldChange}
                placeholder="Your Business PAN"
                required={true}
                variant={'black'}
            />

            <TextInput
                label={'HQ Location'}
                type={'text'}
                value={formValues.hqLocation}
                name={'hqLocation'}
                onFieldChange={onFieldChange}
                placeholder="Kolkata"
                required={true}
                variant={'black'}
            />

            <DateSelector
                label={'Year Of Incorporation'}
                startDate={yearOfIncorporation}
                setStartDate={setYearOfIncorporation}
            />

            <TextInput
                label={'Website'}
                type={'text'}
                value={formValues.website}
                name={'website'}
                onFieldChange={onFieldChange}
                placeholder="www.example.com"
                required={true}
                variant={'black'}
            />

            <TextInput
                label={'Industry'}
                type={'text'}
                value={formValues.industry}
                name={'industry'}
                onFieldChange={onFieldChange}
                placeholder="Fashion & Apparel"
                required={true}
                variant={'black'}
            />

            <TextInput
                label={'Business Type'}
                type={'text'}
                value={formValues.businessType}
                name={'businessType'}
                onFieldChange={onFieldChange}
                placeholder="Manufacturing"
                required={true}
                variant={'black'}
            />

            <TextInput
                label={'Business Size'}
                type={'text'}
                value={formValues.businessSize}
                name={'businessSize'}
                onFieldChange={onFieldChange}
                placeholder="10-30"
                required={true}
                variant={'black'}
            />
        </div>
    );
};

export default BusinessDetails;
