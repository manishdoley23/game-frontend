import { Button } from "./button";
import { Card, CardContent, CardFooter, CardTitle } from "./card";
import PageWrapper from "./page-wrapper";

export default function ErrorPage({ error }: { error: string }) {
  return (
    <PageWrapper>
      <div className="h-screen flex justify-center items-center">
        <Card className="p-6">
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardContent>{error}</CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
