import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import VendorRoles from '@/components/Dashboard/Vendor-Setup/VendorRoles';

export default function KYC(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <VendorRoles />
            </DashboardWrapper>
        </PageWrapper>
    );
}
