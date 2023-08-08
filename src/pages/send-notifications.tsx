import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import SendNotifications from '@/components/Notifications/SendNotifications';

export default function Profile(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <SendNotifications />
            </DashboardWrapper>
        </PageWrapper>
    );
}
