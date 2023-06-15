import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import SubCategories from '@/components/Dashboard/Category-Setup/SubCategories';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <SubCategories />
            </DashboardWrapper>
        </PageWrapper>
    );
}
