import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import AddVendor from '@/components/Dashboard/Vendor-Setup/AddVendor';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper hideRightSidebar={true}>
                <AddVendor />
            </DashboardWrapper>
        </PageWrapper>
    );
}
