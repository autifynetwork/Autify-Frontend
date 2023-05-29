import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import KnowledgeBaseComponent from '@/components/Dashboard/KnowledgeBase';

export default function KnowledgeBase(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <KnowledgeBaseComponent />
            </DashboardWrapper>
        </PageWrapper>
    );
}
