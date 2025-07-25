/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1.5rem",
      },
      center: "true",
    },
    extend: {
      colors: {
        primary: "#122435",
        secondary: "#02507D",
        tertiary: "#71B8FF",
        quaternary: "#C3C3C3",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        myriad: ['"Myriad MM"', "sans-serif"],
      },
      // userSelect: {
      //   none: "none",
      //   text: "text",
      // },
    },
  },
  plugins: [
    // function ({ addBase }) {
    //   addBase({
    //     body: {
    //       userSelect: "none",
    //     },
    //   });
    // },
  ],
};
