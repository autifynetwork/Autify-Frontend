/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: '#e0f2f1',
                    200: '#b2dfdb',
                    300: '#BEE9FF',
                    400: '#D7F0FF',
                    500: '#3B76EF',
                    600: '#5C92FF',
                    700: '#00897b',
                    800: '#032A3E',
                    900: '#00695c',
                },
                secondary: {
                    100: '#ffccbc',
                    200: '#ffab91',
                    300: '#ff8a65',
                    400: '#ff7043',
                    500: '#ff5722',
                    600: '#f4511e',
                    700: '#e64a19',
                    800: '#d84315',
                    900: '#bf360c',
                },
                light: {
                    100: '#FFFFFF',
                    200: '#F6F6F6',
                    300: '#D7E0DF',
                    400: '#D9D9D9',
                    500: '#BFBFBF',
                    600: '#A6A6A6',
                    700: '#7F7F7F',
                    800: '#595959',
                    900: '#404040',
                },
                dark: {
                    100: '#7F7F7F',
                    200: '#595959',
                    300: '#404040',
                    400: '#393939',
                    500: '#2A2A2A',
                    600: '#1D1D1D',
                    700: '#181818',
                    800: '#131313',
                    900: '#0e0e0e',
                    1000: '#000000',
                },
                info: {
                    100: '#C2D0F2',
                    200: '#89A5E3',
                    300: '#3F6FD9',
                    400: '#2C5ECD',
                    500: '#144CC7',
                },
                warning: {
                    100: '#FFF2CC',
                    200: '#FFE699',
                    300: '#FFD966',
                    400: '#FFC000',
                    500: '#F79A11',
                },
                success: {
                    100: '#E6F9F1',
                    200: '#83E0B8',
                    300: '#4FE3A3',
                    400: '#39FD61',
                    500: '#06C270',
                },
                error: {
                    100: '#FCE2DD',
                    200: '#F6A69B',
                    300: '#F47564',
                    400: '#FA2323',
                    500: '#EE4D37',
                    600: '#e33720',
                    700: '#d92911',
                },
            },
            fontFamily: {
                primary: ['JosefinSans', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
