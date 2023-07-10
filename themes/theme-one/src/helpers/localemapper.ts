const map: Record<string, string> = {
    'en': 'us',
}

const localeMapper = (locale: string) => {
    return Object.keys(map).includes(locale) ? map[locale] : locale
}

export {
    localeMapper
}
