import Alpine from "alpinejs"
import './sass/app.scss'
import './js/app.js'
import slugify from "slugify";

window.slugify = slugify

Alpine.start()
