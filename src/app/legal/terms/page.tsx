import { LegalArticle } from '@/components/LegalArticle';
import { termsBody } from '@/content/legal';

export const metadata = { title: '利用規約' };

export default function TermsPage() {
  return <LegalArticle title="利用規約" markdown={termsBody()} />;
}
