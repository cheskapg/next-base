/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green:{
          1:"#32936F",
        },
        black: {
          2: "#ABAFB1",
          4: "#5E6366",
        },
        zest: {
          1: "#FAF1E9",
          2: "#EDC9AA",
          3: "#F48D3E",
          4: "#ED7724",
          5: "#E4641C",
          6: "#D13E27",
        },
        elixir: {
          1: "#E8F2F5",
          2: "#AEE2F3",
          3: "#23BBEC",
          4: "#04A7E0",
          5: "#0067A1",
          6: "#073046",
        },
        spruce: {
          2: "#A7D1DF",
          3: "#4D879B",
          4: "#3D6F80",
          5: "#325A68",
          6: "#2C393E",
        },
        aloe: {
          2: "#DADACA",
          3: "#BBBBA1",
          4: "#979780",
          5: "#7E7E69",
          6: "#575751",
        },
        poise: {
          2: "#DBDDDE",
          3: "#B7BBBD",
          4: "#929A9B",
          5: "#6E787A",
          6: "#4A5659",
        },
        status: {
          green: {
            text: "#066632",
            background: "#EBF9F1",
            
          },
          orange: {
            text: "#A64F00",
            background: "#FEF2E5",
          },
          red: {
            text: "#A30D11",
            background: "#FBE7E8",
          },
        },
      },
    },
  },
};
