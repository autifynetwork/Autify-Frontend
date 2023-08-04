import Modal from '@/components/ui/Modal';

const EditDetailsModal = ({ isOpen = false, setOpen, editComponent, type }: any) => {
    return (
        <Modal
            isOpen={isOpen}
            image={
                <div className="mx-auto flex items-center relative justify-center h-24 w-24 text-5xl">
                    <i className="fa-solid fa-edit"></i>
                </div>
            }
            title={`Edit ${type || ''} details`}
            content={<div>{editComponent}</div>}
            onClose={() => {
                setOpen(false);
            }}></Modal>
    );
};

export default EditDetailsModal;
