import { DrawExperience } from "@/components/tarot/DrawExperience";

type DrawPageProps = {
  searchParams: Promise<{
    question?: string;
  }>;
};

export default async function DrawPage({ searchParams }: DrawPageProps) {
  const params = await searchParams;
  const question = params.question?.trim() || "What are you seeking?";

  return <DrawExperience question={question} />;
}
