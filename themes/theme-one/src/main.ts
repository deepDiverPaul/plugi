import './style.css'
// import typescriptLogo from './typescript.svg'
import 'flowbite';

// @ts-ignore
const toggleNavbar = (collapseID: string) => {
    document.getElementById(collapseID)?.classList.toggle("hidden");
    document.getElementById(collapseID)?.classList.toggle("block");
}
