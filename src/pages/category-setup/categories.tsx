import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import Categories from '@/components/Dashboard/Category/Categories';

export default function Dashboard(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <Categories />
            </DashboardWrapper>
        </PageWrapper>
    );
}
