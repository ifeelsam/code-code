"use client";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/AuthForm"
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import app from "@/lib/auth";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}
const actionCodeSettings = {
  url: "http://localhost:3001",
  handleCodeInApp: true,
};

export default function SignIn() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  async function onSinginin() {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("email send successfully");
        window.localStorage.setItem("emailForSignIn", email);
        alert(`email successfully sent to ${email}`);
      })
      .catch((error) => console.log("error", error));
  }
  // return (
  //   <div className=" h-full w-full">
  //     <Input className="flex justify-center"
  //       onChange={(e) => {
  //         setEmail(e.target.value);
  //       }}
  //     />
  //
  //     <Button className="flex justify-center" onClick={() => onSinginin()}>Sign In</Button>
  //   </div>
  // );
  return (
    <>
      <div className="container relative h-[800px] xl:h-[950px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Code Ace X
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This app helps dev get their algo better&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
