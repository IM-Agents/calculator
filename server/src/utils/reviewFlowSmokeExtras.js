import { getUiOrigin } from '../config/env.js';

/**
 * Builds an absolute URL to the configured UI for review-flow smoke tests.
 * Pathname is normalized so non-strings do not throw.
 * @param {unknown} pathname
 * @returns {string}
 */
export function demoHardcodedUiOrigin(pathname) {
  const origin = getUiOrigin().replace(/\/$/, '');
  const raw =
    typeof pathname === 'string'
      ? pathname
      : pathname == null
        ? ''
        : String(pathname);
  const p = raw.length > 0 ? raw : '/';
  const pathPart = p.startsWith('/') ? p : `/${p}`;
  return `${origin}${pathPart}`;
}
