/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans': ['Noto Sans Thai', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#006cff",
          secondary: "#00e7ff",
          accent: "#00b8ff",
          neutral: "#080f1c",
          "base-100": "#f5faff",
          info: "#00c4f8",
          success: "#45df7a",
          warning: "#ef9b00",
          error: "#ff7888",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
