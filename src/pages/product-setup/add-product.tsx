import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import AddProduct from '@/components/Dashboard/Product-Setup/AddProduct';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper hideRightSidebar={true}>
                <AddProduct />
            </DashboardWrapper>
        </PageWrapper>
    );
}
