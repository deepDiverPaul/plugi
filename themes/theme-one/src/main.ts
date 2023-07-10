import './style.css'
// import typescriptLogo from './typescript.svg'
import Alpine from 'alpinejs'
import {localeMapper} from "./helpers/localemapper.ts";


const getFlagEmoji = (locale: string)=> {
    const countryCode = localeMapper(locale)
    return String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt(0)))
}

window.plugi = {}
window.plugi.getFlagEmoji = getFlagEmoji

Alpine.start()
