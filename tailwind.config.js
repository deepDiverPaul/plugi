/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/Modules/Auth/**/*.{html,js,php}",
    "./src/Modules/WebsiteManager/**/*.{html,js,php}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: ["lemonade","forest","cupcake"],
    darkTheme: "lemonade",
  }
}

