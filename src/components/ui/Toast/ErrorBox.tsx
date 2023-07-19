import { Fragment, useContext, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { StatusContext } from '@/store/StatusContextProvider';

const ErrorBox = ({ style }: any) => {
    const { error, setError } = useContext(StatusContext);

    const handleClose = () => {
        setError((prevState: any) => ({
            ...prevState,
            showErrorBox: false,
        }));
    };

    useEffect(() => {
        if (error?.showErrorBox) {
            setTimeout(function () {
                setError((prevState: any) => ({
                    ...prevState,
                    showErrorBox: false,
                }));
            }, 5000);
        }
    }, [error?.showErrorBox, setError]);

    return (
        <Transition show={error?.showErrorBox}>
            <Transition.Child
                as={Fragment}
                enter="transition-all ease-in-out duration-400"
                enterFrom="opacity-0 scale-75 translate-x-full"
                enterTo="opacity-100 scale-100"
                leave="transition-all ease-out duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75 translate-x-full">
                <div
                    className={
                        'fixed bottom-0 right-0 z-[110] lg:w-5/12 md:w-8/12 sm:w-3/4 w-11/12 px-5 py-4 -translate-x-4 -translate-y-4 rounded-lg shadow-2xl break-words ' +
                        (style == 1
                            ? 'xl:w-4/12 text-light-200 bg-error-600/80 border-error-700 border-2 backdrop-blur-[40px] backdrop-brightness-200'
                            : style == 2
                            ? 'xl:w-3/12 text-light-200 bg-dark-900 border-error-700 border-[0.5px] backdrop-blur-[40px] backdrop-brightness-200'
                            : style == 3
                            ? 'xl:w-3/12 text-dark-500 bg-light-100 border-error-700 border-[0.5px] backdrop-blur-[40px] backdrop-brightness-200'
                            : '')
                    }
                    role="alert">
                    <p
                        className={
                            'font-semibold mb-4 ' +
                            (style == 1
                                ? 'text-base'
                                : style == 2
                                ? 'text-base text-error-500'
                                : style == 3
                                ? 'text-base text-error-500'
                                : '')
                        }>
                        {error?.title}
                    </p>
                    <span
                        className={
                            'block sm:inline ' +
                            (style == 1 ? 'text-base' : style == 2 ? 'text-sm' : style == 3 ? 'text-sm' : '')
                        }>
                        {error?.message}
                    </span>
                    <div
                        onClick={handleClose}
                        className={
                            'absolute flex justify-center items-center rounded-md transition-all duration-200 cursor-pointer hover:bg-error-600 ' +
                            (style == 1
                                ? 'w-8 h-8 top-1 right-1'
                                : style == 2
                                ? 'w-6 h-6 top-2 right-2'
                                : style == 3
                                ? 'w-6 h-6 top-2 right-2 group'
                                : '')
                        }>
                        <i
                            className={
                                'fa-solid fa-xmark ' +
                                (style == 1
                                    ? 'text-base text-light-400'
                                    : style == 2
                                    ? 'text-sm text-light-400'
                                    : style == 3
                                    ? 'text-sm text-dark-100 group-hover:text-light-100'
                                    : '')
                            }></i>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    );
};

export default ErrorBox;
