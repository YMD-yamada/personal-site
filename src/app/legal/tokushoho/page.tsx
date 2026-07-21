import { LegalArticle } from '@/components/LegalArticle';
import { tokushohoBody } from '@/content/legal';

export const metadata = { title: '特定商取引法に基づく表記' };

export default function TokushohoPage() {
  return (
    <LegalArticle title="特定商取引法に基づく表記" markdown={tokushohoBody()} />
  );
}
