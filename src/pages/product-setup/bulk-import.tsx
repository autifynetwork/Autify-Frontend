import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import BulkImport from '@/components/Dashboard/Product-Setup/BulkImport';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <BulkImport />
            </DashboardWrapper>
        </PageWrapper>
    );
}
