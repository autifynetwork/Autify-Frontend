import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import DashboardComponent from '@/components/Dashboard/Home';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <DashboardComponent />
            </DashboardWrapper>
        </PageWrapper>
    );
}
