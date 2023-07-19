/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#25292e",
        modalTitleContainerBg: "#464C55",
        textColor: "#fff",
        red: "red",
        buttonBorderColor: "#ffd33d",
      },
      borderWidth: {
        ten: 10,
      },
    },
  },
  plugins: [],
};
