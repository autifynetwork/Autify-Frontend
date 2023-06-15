import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import ProductList from '@/components/Dashboard/Product-Setup/ProductList';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <ProductList />
            </DashboardWrapper>
        </PageWrapper>
    );
}
