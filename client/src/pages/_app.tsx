import "@/styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Montserrat({ weight: "300", subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const routeName = router.route.substring(1);
  // console.log(router)
  return (
    <main className={inter.className}>
      <Head>
        <title>{routeName === "" ? "Ecommerce" : routeName}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Provider>
    </main>
  );
}
