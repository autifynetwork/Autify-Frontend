import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import VendorList from '@/components/Dashboard/Vendor-Setup/VendorList';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <VendorList />
            </DashboardWrapper>
        </PageWrapper>
    );
}
