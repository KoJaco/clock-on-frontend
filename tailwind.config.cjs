/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            // add custom font from excalidraw, credit to Ellinor Rapp | https://github.com/excalidraw/virgil
            virgil: ["Virgil", "sans-serif"],
        },
        extend: {
            // extend typography plugin
            typography: ({ theme }) => ({
                pink: {
                    css: {
                        "--tw-prose-body": theme("colors.pink[800]"),
                        "--tw-prose-headings": theme("colors.pink[900]"),
                        "--tw-prose-lead": theme("colors.pink[700]"),
                        "--tw-prose-links": theme("colors.pink[900]"),
                        "--tw-prose-bold": theme("colors.pink[900]"),
                        "--tw-prose-counters": theme("colors.pink[600]"),
                        "--tw-prose-bullets": theme("colors.pink[400]"),
                        "--tw-prose-hr": theme("colors.pink[300]"),
                        "--tw-prose-quotes": theme("colors.pink[900]"),
                        "--tw-prose-quote-borders": theme("colors.pink[300]"),
                        "--tw-prose-captions": theme("colors.pink[700]"),
                        "--tw-prose-code": theme("colors.pink[900]"),
                        "--tw-prose-pre-code": theme("colors.pink[100]"),
                        "--tw-prose-pre-bg": theme("colors.pink[900]"),
                        "--tw-prose-th-borders": theme("colors.pink[300]"),
                        "--tw-prose-td-borders": theme("colors.pink[200]"),
                        "--tw-prose-invert-body": theme("colors.pink[200]"),
                        "--tw-prose-invert-headings": theme("colors.white"),
                        "--tw-prose-invert-lead": theme("colors.pink[300]"),
                        "--tw-prose-invert-links": theme("colors.white"),
                        "--tw-prose-invert-bold": theme("colors.white"),
                        "--tw-prose-invert-counters": theme("colors.pink[400]"),
                        "--tw-prose-invert-bullets": theme("colors.pink[600]"),
                        "--tw-prose-invert-hr": theme("colors.pink[700]"),
                        "--tw-prose-invert-quotes": theme("colors.pink[100]"),
                        "--tw-prose-invert-quote-borders":
                            theme("colors.pink[700]"),
                        "--tw-prose-invert-captions": theme("colors.pink[400]"),
                        "--tw-prose-invert-code": theme("colors.white"),
                        "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders":
                            theme("colors.pink[600]"),
                        "--tw-prose-invert-td-borders":
                            theme("colors.pink[700]"),
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        plugin(function ({ addComponents, addUtilities }) {
            addUtilities({
                ".scrollbar-rounded::-webkit-scrollbar": {
                    display: "block",
                    width: "6px",
                    height: "10px",
                },
                ".scrollbar-rounded-horizontal::-webkit-scrollbar": {
                    display: "block",
                    width: "auto",
                    height: "6px",
                    cursor: "pointer",
                },

                ".scrollbar-rounded::-webkit-scrollbar-track": {
                    borderRadius: "100vh",
                    background: "#FFFFFF00",
                },
                ".scrollbar-rounded-horizontal::-webkit-scrollbar-track": {
                    borderRadius: "100vh",
                    background: "#f3f4f6",
                },

                ".scrollbar-rounded::-webkit-scrollbar-thumb": {
                    background: "#64748b",
                    borderRadius: "100vh",
                    border: "3px solid #64748b",
                },
                ".scrollbar-rounded-horizontal::-webkit-scrollbar-thumb": {
                    background: "#666",
                    borderRadius: "100vh",
                    border: "3px solid #FFFFFF00",
                },

                ".scrollbar-rounded::-webkit-scrollbar-thumb:hover": {
                    background: "#FFFFFF00",
                },

                ".scrollbar-rounded-horizontal::-webkit-scrollbar-thumb:hover":
                    {
                        background: "#475569",
                    },
                ".no-scrollbar::-webkit-scrollbar": {
                    display: "none",
                },
                ".no-scrollbar": {
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                },
                ".invisible-scrollbar::-webkit-scrollbar": {
                    width: "auto",
                    opacity: "0",
                },

                ".scrollbar-visible::-webkit-scrollbar": {
                    width: "auto",
                    opacity: "100",
                },
            });
        }),
    ],
};
