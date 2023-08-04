import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import VendorsPayment from '@/components/Vendor/VendorsPayment';

export default function KYC(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <VendorsPayment />
            </DashboardWrapper>
        </PageWrapper>
    );
}
