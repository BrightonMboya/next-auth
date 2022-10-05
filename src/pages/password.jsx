import React, { useRef } from "react";
import Navigation from "../components/Navigation";

async function changePasswordHandler(passwordData) {
  const response = await fetch("/api/user/change-password", {
    method: "PATCH",
    body: JSON.stringify(passwordData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
}

const password = () => {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    changePasswordHandler({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  };
  return (
    <main className="font-montserrat h-[100vh] bg-slate-800">
      <Navigation />
      <section className="flex items-center justify-center text-white">
        <form
          className="flex flex-col items-center"
          onSubmit={submitHandler}
          //   method="POST"
        >
          <h3 className="mt-[2rem] text-center">Change Your Password!!</h3>

          <div className="mt-[3rem] flex flex-col">
            <label htmlFor="people">Enter your Old Password</label>
            <input
              type="password"
              ref={oldPasswordRef}
              required
              className="rounded-md border-[1px] border-slate-300 py-1 px-1 text-black"
            />
          </div>

          <div className="mt-[1rem] flex flex-col">
            <label htmlFor="people">Enter your New password</label>
            <input
              type="password"
              ref={newPasswordRef}
              required
              className="rounded-md border-[1px] border-slate-300 py-1 px-1 text-black"
            />
          </div>

          <button className="mt-3 cursor-pointer rounded-md bg-amber-400 px-2 py-2">
            Change Password
          </button>
        </form>
      </section>
    </main>
  );
};

export default password;
