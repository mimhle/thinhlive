
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";
import fluid, { extract, screens } from "fluid-tailwind";

module.exports = {
    content: {
        files: [
            "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        extract
    },
    theme: {
        extend: {},
        screens
    },
    plugins: [
        typography,
        daisyui,
        fluid
    ],
    daisyui: {
        themes: ["forest"],
    },
};
