/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey900: "#2A4144",
        grey500: "#86A2A5",
        green600: "#0C7D69",
        green900: "#063F37",
        green200: "#E0F1E8",
        rederror: "#D73C3C",
      },
    },
  },
  plugins: [],
};
