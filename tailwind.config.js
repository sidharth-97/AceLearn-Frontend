/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        '3447AE': '#3447AE',
        "9ED0F5": "#9ED0F5",
        'D9E2EC': "#D9E2EC",
        'B7DFFC':" #B7DFFC"
      },
      width: {
        '128':"32rem"
      }
    },
  },
 
  plugins: [],
}