import i18next, { ThirdPartyModule } from 'i18next'
import { i18nextPlugin, showTranslations } from '../../'
import { expectType } from 'tsd'

expectType<ThirdPartyModule>(i18nextPlugin)
expectType<void>(showTranslations(i18next))
expectType<void>(showTranslations(i18next, {
  sourceLng: 'en',
  targetLngs: ['de'],
  preserveEmptyStrings: true
}))
