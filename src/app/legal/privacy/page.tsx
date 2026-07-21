import { LegalArticle } from '@/components/LegalArticle';
import { privacyBody } from '@/content/legal';

export const metadata = { title: 'プライバシーポリシー' };

export default function PrivacyPage() {
  return <LegalArticle title="プライバシーポリシー" markdown={privacyBody()} />;
}
