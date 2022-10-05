import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { getSession } from "next-auth/react";

const profile = () => {
  //   const [isLoading, SetIsLoading] = useState(false);
  //   const [loadedSession, setLoadedSession] = useState();
  //   useEffect(() => {
  //     getSession().then((session) => {
  //       setLoadedSession(session);
  //       if (!session) {
  //         window.location.href = "/";
  //       } else {
  //         SetIsLoading(false);
  //       }
  //     });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading ....</p>;
  //   }

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-slate-700">
      <Navigation />
      <h3 className="text-xl tracking-widest text-amber-500">
        This is the profile Page
      </h3>
    </main>
  );
};

export default profile;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
