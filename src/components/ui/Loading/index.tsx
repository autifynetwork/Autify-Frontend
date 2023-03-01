import styles from '@/styles/Loading/Loading.module.css';

export default function Loading({ status, section, title, showProgressBar, progress, message, waitMessage }: any) {
    return (
        status && (
            <div className={section ? styles['loading_section_container'] : styles['loading_container']}>
                <div className={styles['loading_container_box']}>
                    <div className={styles['loadingSpinner']}></div>
                </div>
                {title && <p>{title}</p>}

                {showProgressBar && (
                    <div className="w-11/12 sm:1/2 md:1/4 lg:w-1/5 mt-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                            className={
                                'relative min-w-fit bg-primary-500 text-xs font-medium text-blue-100 text-end p-0.5 leading-none rounded-full'
                            }
                            style={{ width: `${progress}%` }}>
                            <div className="relative text-white text-xs inline-block bg-primary-500 px-2 h-full rounded-full">
                                {progress}%
                            </div>
                        </div>
                    </div>
                )}

                {message && (
                    <p>
                        <span>{message}</span>
                    </p>
                )}

                {waitMessage && (
                    <p>
                        <span>{waitMessage}</span>
                    </p>
                )}
            </div>
        )
    );
}
