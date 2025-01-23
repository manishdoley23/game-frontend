import { LoadingSpinner } from "./loading-spinner";
import PageWrapper from "./page-wrapper";

export default function LoadingPage() {
  return (
    <PageWrapper>
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    </PageWrapper>
  );
}
