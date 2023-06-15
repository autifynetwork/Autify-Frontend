import Step from '@/components/KYB/Step';

export default function Sidebar({ step, setStep }: any) {
    return (
        <div className="basis-full md:basis-4/12 pt-16 p-12 bg-primary-400 rounded-xl">
            <ol className="flex flex-col items-start w-full space-y-24">
                <Step
                    heading="Step 1"
                    text="Personal Information"
                    isActive={step === 1}
                    onClick={() => {
                        setStep(1);
                    }}
                    isComplete={step > 1}
                    icon={'fa-solid fa-id-card'}
                />
                <Step
                    heading="Step 2"
                    text="Business Information"
                    isActive={step === 2}
                    onClick={() => {
                        setStep(2);
                    }}
                    isComplete={step > 2}
                    icon={'fa-solid fa-briefcase'}
                />
                <Step
                    heading="Step 3"
                    text="Upload Documents"
                    isActive={step === 3}
                    onClick={() => {
                        setStep(3);
                    }}
                    isComplete={step > 3}
                    lastStep={true}
                    icon={'fa-solid fa-cloud-arrow-up'}
                />
            </ol>
        </div>
    );
}
