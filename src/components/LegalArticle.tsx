import styles from './LegalArticle.module.css';

export function LegalArticle({
  title,
  markdown,
}: {
  title: string;
  markdown: string;
}) {
  const html = markdownToSimpleHtml(markdown);
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}

function markdownToSimpleHtml(md: string) {
  const lines = md.trim().split('\n');
  const out: string[] = [];
  let inList = false;
  let inTable = false;

  const flushList = () => {
    if (inList) {
      out.push('</ul>');
      inList = false;
    }
  };
  const flushTable = () => {
    if (inTable) {
      out.push('</tbody></table>');
      inTable = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      flushTable();
      continue;
    }
    if (line.startsWith('# ')) {
      flushList();
      flushTable();
      continue;
    }
    if (line.startsWith('## ')) {
      flushList();
      flushTable();
      out.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('|') && line.includes('|', 1)) {
      flushList();
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      if (cells.every((c) => /^-+$/.test(c))) {
        continue;
      }
      if (!inTable) {
        out.push('<table><tbody>');
        inTable = true;
        out.push(
          `<tr>${cells.map((c) => `<th>${inline(c)}</th>`).join('')}</tr>`,
        );
      } else {
        out.push(
          `<tr>${cells.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`,
        );
      }
      continue;
    }
    if (line.startsWith('- ')) {
      flushTable();
      if (!inList) {
        out.push('<ul>');
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }
    flushList();
    flushTable();
    out.push(`<p>${inline(line)}</p>`);
  }
  flushList();
  flushTable();
  return out.join('\n');
}

function inline(text: string) {
  return escapeHtml(text)
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" rel="noopener noreferrer">$1</a>',
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
