/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens : {
        'sm-custom': '640px',
        'ultraxl': '2400px',
      }
    },
  },
  plugins: [],
}

