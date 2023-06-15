import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import ProductAttribute from '@/components/Dashboard/Product-Setup/ProductAttribute';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <ProductAttribute />
            </DashboardWrapper>
        </PageWrapper>
    );
}
