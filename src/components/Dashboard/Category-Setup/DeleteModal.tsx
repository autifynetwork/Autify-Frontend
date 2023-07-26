import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import { isValidURL } from '@/utils';

const DeleteModal = ({ isOpen, setOpen, title, confirmation, itemToDelete, type, handleDelete }: any) => {
    return (
        <Modal
            isOpen={isOpen}
            image={
                <div className="mx-auto flex items-center relative justify-center h-24 w-24 text-4xl">
                    <i className="fa-solid fa-trash"></i>
                </div>
            }
            title={title}
            content={
                <div>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            await handleDelete(itemToDelete.id);
                            setOpen(false);
                        }}>
                        <div className="flex flex-col justify-center items-center gap-y-6">
                            {type == 'category' && itemToDelete.image && isValidURL(itemToDelete.image) ? (
                                <Image src={itemToDelete.image} alt="category image" />
                            ) : (
                                type == 'category' && (
                                    <div
                                        className={`bg-primary-300 opacity-40 w-20 h-20 flex items-center justify-center rounded-lg text-light-100 text-xl`}>
                                        <i className="fa-solid fa-image"></i>
                                    </div>
                                )
                            )}

                            <div className="flex justify-center items-center gap-x-4">
                                <p className="text-xl font-semibold text-dark-500">{itemToDelete?.name}</p>
                            </div>
                        </div>

                        <p className="text-sm font-semibold text-center mt-10">
                            {confirmation} {type}?
                        </p>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center mt-10 -mb-6 px-6 py-2 text-sm font-primary font-bold rounded-md bg-error-600 hover:bg-error-700 text-light-100">
                                Delete
                                <span className="ml-6 text-lg">
                                    <i className="fa-solid fa-arrow-right-long"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            }
            onClose={() => {
                setOpen(false);
            }}></Modal>
    );
};

export default DeleteModal;
