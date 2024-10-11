/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // добавьте этот путь, если у вас есть index.html в корне
    './src/**/*.{vue,js,ts,jsx,tsx}', // путь к вашим компонентам
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

