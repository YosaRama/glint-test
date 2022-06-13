// Libs
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

// Components
import MainLayout from "../components/layout";

// Utils
import { fetcher } from "utils/swr";

// Styles
import "styles/global.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          fetcher,
        }}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
