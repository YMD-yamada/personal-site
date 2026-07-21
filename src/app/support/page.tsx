import { LegalArticle } from '@/components/LegalArticle';
import { supportBody } from '@/content/legal';
import { siteConfig } from '@/config/site';

export const metadata = { title: 'サポート' };

export default function SupportPage() {
  return (
    <LegalArticle
      title="サポート"
      markdown={`${supportBody()}

運営: ${siteConfig.operatorName}
`}
    />
  );
}
