import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import Track from '@/components/Dashboard/OrderManagement/Track';

export default function TrackOrder(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper hideRightSidebar={true}>
                <Track />
            </DashboardWrapper>
        </PageWrapper>
    );
}
