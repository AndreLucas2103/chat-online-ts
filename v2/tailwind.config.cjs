/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "padrao": "14px",
        "10px": "10px",
        "12px": "12px",
        "16px": "16px",
        "20px": "20px",
      },
      spacing: { // espaço para utilizar a margim e padding
        "10px": "10px",
        "20px": "20px",
        "30px": "30px",
        "40px": "40px",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}