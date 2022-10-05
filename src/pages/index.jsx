import React, { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Navigation from "../components/Navigation";
import { useRouter } from "next/router";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

export default function Index() {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    console.log(isLogin);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      //log user in
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <React.Fragment>
      <main className="font-montserrat h-[100vh] bg-slate-800">
        <Navigation />
        <section className="flex items-center justify-center text-white">
          <form
            className="flex flex-col items-center"
            onSubmit={submitHandler}
            method="POST"
          >
            <h3 className="mt-[2rem] text-center">
              Simple Auth using Next-Auth!
            </h3>

            <div className="mt-[3rem] flex flex-col">
              <label htmlFor="people">Enter your email</label>
              <input
                type="email"
                ref={emailInputRef}
                required
                className="rounded-md border-[1px] border-slate-300 py-1 px-1 text-black"
              />
            </div>

            <div className="mt-[1rem] flex flex-col">
              <label htmlFor="people">Enter your password</label>
              <input
                type="password"
                ref={passwordInputRef}
                required
                className="rounded-md border-[1px] border-slate-300 py-1 px-1 text-black"
              />
            </div>

            <button className="mt-3 cursor-pointer rounded-md bg-amber-400 px-2 py-2">
              {isLogin ? "Login" : "Create New Account"}
            </button>
            <button
              type="button"
              onClick={switchAuthModeHandler}
              className="mt-5 text-xl"
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </form>
        </section>
      </main>
    </React.Fragment>
  );
}
