import { ReadingResultPage } from "@/components/reading/ReadingResultPage";

type ResultPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;

  return <ReadingResultPage readingId={id} />;
}
