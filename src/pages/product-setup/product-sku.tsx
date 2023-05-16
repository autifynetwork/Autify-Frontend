import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import ProductSku from '@/components/Dashboard/Product-Setup/ProductSku';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <ProductSku />
            </DashboardWrapper>
        </PageWrapper>
    );
}
