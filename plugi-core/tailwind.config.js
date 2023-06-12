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
    themes: [
      {
        plugiLight: {
          "primary": "#374151",
          "secondary": "#374151",
          "accent": "#FCE44D",
          "neutral": "#000000",
          "base-100": "#ebeaeb",
          "info": "#5292e0",
          "success": "#65a30d",
          "warning": "#f3b06d",
          "error": "#e87d98",
        },
      },"emerald","night",
    ],
    darkTheme: "night",
  }
}

