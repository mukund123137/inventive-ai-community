import { QuestionDetail } from "@/components/pages/QuestionDetail";

export default async function QuestionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <QuestionDetail slug={slug} />;
}
