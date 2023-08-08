import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import Complete from '@/components/Dashboard/OrderManagement/Complete';

export default function KYC(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper hideRightSidebar={true}>
                <Complete />
            </DashboardWrapper>
        </PageWrapper>
    );
}
