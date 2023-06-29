/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,php}",
    "./blocks/**/*.{html,ts,php}",
    "./layouts/**/*.{html,ts,php}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f6faf3',
          '100': '#e9f5e3',
          '200': '#d3eac8',
          '300': '#afd89d',
          '400': '#82bd69',
          '500': '#61a146',
          '600': '#4c8435',
          '700': '#3d692c',
          '800': '#345427',
          '900': '#2b4522',
          '950': '#13250e',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

