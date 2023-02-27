import { useContext } from 'react';
import { LoadingContext } from '@/store/LoadingContext';
import Loading from '@/components/ui/Loading';

const Layout = ({ children }: any) => {
    const [isLoading] = useContext(LoadingContext);

    return (
        <>
            {isLoading.status && (
                <Loading
                    status={isLoading.status}
                    section={isLoading.section}
                    title={isLoading.title}
                    showProgressBar={isLoading.showProgressBar}
                    progress={isLoading.progress}
                    message={isLoading.message}
                    waitMessage={isLoading.waitMessage}
                />
            )}
            {children}
        </>
    );
};

export default Layout;
