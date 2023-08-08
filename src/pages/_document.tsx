import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Tailwind Elements */}
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/tw-elements.min.css" />
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
