import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import KYCDetails from '@/components/KYC/KYCDetails';

export default function KYC(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <KYCDetails />
            </DashboardWrapper>
        </PageWrapper>
    );
}
