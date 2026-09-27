export const languages = {
  es: 'ES',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

/** A config string: plain when it's the same in every language, or one value per language */
export type Localized = string | Record<Lang, string>;

/** Resolves a config string to the given language, falling back to the default one */
export function tr(value: Localized, lang: Lang): string {
  if (typeof value === 'string') return value;
  return value[lang] ?? value[defaultLang];
}

export function getLocalizedPath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}
