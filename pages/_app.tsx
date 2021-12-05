import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@components/layout/store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            custom: {
              duration: 1000,
            },
          }}
        />
      </div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
