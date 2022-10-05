// import "../styles/globals.css";
// import type { AppType } from "next/dist/shared/lib/utils";
// import { SessionProvider } from "next-auth/react";

// const MyApp: AppType = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }) => {
//   return <Component {...pageProps} />;
// };

// export default MyApp;

import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
};

export default MyApp;
