import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <h1 className="font-semibold text-4xl px-12">Dashboard</h1>
            </DashboardWrapper>
        </PageWrapper>
    );
}
