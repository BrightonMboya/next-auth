import React, { useState, useRef } from "react";

import Link from "next/link";

export default function Destination() {
  const emailInputRef = useRef<string>("");
  const passwordInputRef = useRef<string>("");
  const [isLogin, setIsLogin] = useState(true);

  async function createUser(email: string, password: string) {
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

  async function submitHandler(event: any) {
    event.preventDefault();
    console.log("the fn is getting called");
    const enteredEmail = emailInputRef.current!.valueOf;
    const enteredPassword = passwordInputRef.current!.valueOf;
    console.log(enteredEmail, enteredPassword);
    if (isLogin) {
      //log user in
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
      <main className="font-montserrat">
        <section className="flex items-center justify-center">
          <form className="flex flex-col items-center" onSubmit={submitHandler}>
            <h3 className="mt-[2rem] text-center">
              Simple Auth using Next-Auth
            </h3>

            <div className="mt-[3rem] flex flex-col">
              <label htmlFor="people">Enter your email</label>
              <input type="email" ref={emailInputRef} required />
            </div>

            <div className="mt-[1rem] flex flex-col">
              <label htmlFor="people">Enter the number of Meals a day</label>
              <input type="password" ref={passwordInputRef} required />
            </div>

            {/* <div className="mt-[1rem] flex flex-col">
              <label htmlFor="people">Enter the number of days</label>
              <input
                type="number"
                min="1"
                max="100"
                onChange={(e: any) => setDaysNo(e.target.value)}
                className="w-[302px] rounded-md border-[1px] border-slate-300"
              />
            </div>

            <p className="mt-3">
              The estimated budget is ${touristNo + daysNo * 100 + mealsNo * 10}
            </p> */}

            <button
              className="mt-3 cursor-pointer rounded-md bg-amber-400 px-2 py-2"
              onClick={submitHandler}
            >
              Generate a new Quotation
            </button>
          </form>
        </section>
      </main>
    </React.Fragment>
  );
}
