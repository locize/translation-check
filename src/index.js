const url = 'https://mini.locize.com'
// const url = 'http://localhost:3000'

export const showTranslations = (i18next, options = {}) => {
  const isI18next = i18next.store && i18next.store.toJSON

  const opts = {
    sourceLng: options.sourceLng,
    targetLngs: options.targetLngs,
    preserveEmptyStrings: options.preserveEmptyStrings,
    i18nFormat: options.i18nFormat
  }
  let resources
  if (isI18next) {
    if (!opts.sourceLng) opts.sourceLng = i18next.languages[0]
    if (!opts.targetLngs) opts.targetLngs = i18next.options.supportedLngs ? i18next.options.supportedLngs.filter((l) => l !== i18next.languages[0] && l !== 'cimode') : undefined
    if (!opts.preserveEmptyStrings) opts.preserveEmptyStrings = i18next.options.returnEmptyString
    if (!opts.i18nFormat) opts.i18nFormat = (i18next.options.compatibilityJSON && i18next.options.compatibilityJSON !== 'v4') ? 'i18next_v3' : 'i18next_v4'
    resources = i18next.store.toJSON()
  } else {
    resources = i18next
  }

  const newWindow = window.open(url)
  const initInt = setInterval(() => newWindow.postMessage({ message: 'isEditorReady' }, url), 1000)

  window.addEventListener('message', (evt) => {
    if (evt.origin !== url) return
    if (evt.data.message === 'editorIsReady') {
      clearInterval(initInt)
      newWindow.postMessage({
        message: 'initializeProject',
        ...opts,
        resources
      }, url)
    }
  })
}

const defaultOptions = {
  queryStringParam: 'showtranslations'
}

export const i18nextPlugin = {
  type: '3rdParty',

  init (i18next) {
    const options = { ...defaultOptions, ...i18next.options.translationStats }
    i18next.on('initialized', () => {
      const params = new URLSearchParams(window.location.search)
      if (params.has(options.queryStringParam)) {
        showTranslations(i18next, options)
      }
    })
  }
}
