import Button from '@/components/ui/Button';

const ActionButtons = ({ step, lastStep, prevStep }: any) => {
    return (
        <div className="flex justify-between gap-x-8 mt-12">
            <div>
                {step !== 1 && (
                    <Button variant={'white'} outline={true} type="button" onClick={() => prevStep()}>
                        Back
                    </Button>
                )}
            </div>
            <div>
                <Button variant={'secondary'} type="submit">
                    {step == lastStep ? 'Submit' : 'Continue'}
                </Button>
            </div>
        </div>
    );
};

export default ActionButtons;
