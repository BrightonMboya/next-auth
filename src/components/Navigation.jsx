import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();

  const logOutHandler = () => {
    signOut();
  };
  return (
    <header className="flex justify-between">
      <Link href="/">
        <a>
          <div className="text-xl -tracking-wider text-purple-500">
            Next Auth
          </div>
        </a>
      </Link>
      <nav className=" text-white">
        <ul className="flex items-center justify-center gap-5">
          {!session && (
            <li>
              <Link href="/">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}

          {session && (
            <li>
              <button onClick={logOutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
