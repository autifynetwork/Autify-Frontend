import PageWrapper from '@/layout/PageWrapper';
import DashboardWrapper from '@/layout/DashboardWrapper';
import FeatureRequestDetails from '@/components/FeatureRequest/FeatureRequestDetails';

export default function FeatureRequest(): JSX.Element {
    return (
        <PageWrapper useDefaultContainer={false}>
            <DashboardWrapper>
                <FeatureRequestDetails />
            </DashboardWrapper>
        </PageWrapper>
    );
}
