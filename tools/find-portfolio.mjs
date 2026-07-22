/**
 * Resolve ymd-portfolio root for dual registration.
 */
import fs from 'node:fs';
import path from 'node:path';

export function findPortfolioRoot(fromDir) {
  const env = process.env.YMD_PORTFOLIO_ROOT;
  if (env && fs.existsSync(path.join(env, 'scripts', 'register-app.mjs'))) {
    return env;
  }

  const candidates = [
    path.resolve(fromDir, '..', 'ymd-portfolio'),
    path.resolve(fromDir, '..', '..', '.cursor', 'projects', 'empty-window', 'ymd-portfolio'),
    path.resolve(
      process.env.USERPROFILE || '',
      '.cursor',
      'projects',
      'empty-window',
      'ymd-portfolio',
    ),
    path.resolve(process.env.USERPROFILE || '', 'Projects', 'ymd-portfolio'),
  ];

  for (const c of candidates) {
    if (c && fs.existsSync(path.join(c, 'scripts', 'register-app.mjs'))) {
      return c;
    }
  }
  return '';
}
