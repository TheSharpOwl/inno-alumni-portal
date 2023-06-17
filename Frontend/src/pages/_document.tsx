import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GlobalContextProvider } from 'Context/store'


class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <GlobalContextProvider>
                        <Main />
                        <NextScript />
                    </GlobalContextProvider>
                </body>
            </Html>
        )
    }
}

export default MyDocument