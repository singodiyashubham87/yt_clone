export default {
  content: ["./src/**/*.{js,jsx}", "./*.html"],
  theme: {
    extend: {
      colors: {
        bgBlack: "#212325",
        lightBlue: "#9CDAF1",
        darkBlue: "#368186",
        lightRed: "#F4CBB2",
        lightGrey: "#ABABAB",
        darkGrey: "#2E3136",
      },
      fontFamily: {
        primary: "Inter",
        secondary: "Poppins"
      },
      screens: {
        xxl: "1751px",
        mmd: "851px",
        gsm: "571px",
        msm: "491px",
        vsm: "441px",
        vvsm: "351px",
      },
      boxShadow: {
        mdm: "0 0 5px 2px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};