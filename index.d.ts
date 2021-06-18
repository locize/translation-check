import { ThirdPartyModule, i18n } from 'i18next'

export const i18nextPlugin: ThirdPartyModule

export interface ShowTranslatioOptions {
  /**
   * Source language
   * @default undefined
   */
  sourceLng?: string

  /**
   * Target languages
   * @default undefined
   */
  targetLngs?: Array<string>

  /**
   * Preserve empty strings
   * @default false
   */
  preserveEmptyStrings?: boolean
}

declare function showTranslations(i18next: i18n, options?: ShowTranslatioOptions): void
