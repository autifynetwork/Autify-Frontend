import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import RaiseTicket from '@/components/RaiseTicket/RaiseTicket';

export default function Profile(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <RaiseTicket />
            </DashboardWrapper>
        </PageWrapper>
    );
}
