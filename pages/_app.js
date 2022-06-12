// Libs
import { SessionProvider } from "next-auth/react";

// Components
import MainLayout from "../components/layout";

// Styles
import "styles/global.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  );
}

export default MyApp;
