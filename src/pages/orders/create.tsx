import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import Create from '@/components/Dashboard/OrderManagement/Create';

export default function CreateOrder(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <Create />
            </DashboardWrapper>
        </PageWrapper>
    );
}
