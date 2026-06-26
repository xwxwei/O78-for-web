type QuestionPreviewProps = {
  question: string;
};

export function QuestionPreview({ question }: QuestionPreviewProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="text-xl font-light leading-8 text-white sm:text-2xl">{question}</h1>
    </div>
  );
}
