import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Underline from '@/components/ui/Underline';

const EmailNotWhitelistedModal = ({ isOpen, setOpen }: any) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                header={
                    <div className="font-base">
                        PRODUCT WAITLIST
                        <Underline />
                    </div>
                }
                image={
                    <div className="mx-auto flex items-center relative justify-center h-[400px] w-[550px]">
                        <Image src="/assets/login/not_whitelisted.svg" layout="fill" alt="Success" />
                    </div>
                }
                title={
                    <div className="w-full flex flex-col justify-center items-center">
                        <div className="text-dark-400 text-xl font-normal">
                            Looks like we are unable to find your email in our database
                        </div>
                        <div className="m-0 p-0 mt-4 w-1/3 flex items-center justify-center">
                            <Button type="button" variant="secondary" classes="text-md px-4 py-2">
                                Talk to us
                            </Button>
                        </div>
                    </div>
                }
                onClose={() => {
                    setOpen(false);
                }}></Modal>
        </>
    );
};

export default EmailNotWhitelistedModal;
