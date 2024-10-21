"use client";

import * as React from "react";
import { app, provider } from "@/lib/auth";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/user";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const actionCodeSettings = {
  url: "http://localhost:3000",
  handleCodeInApp: true,
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useRecoilState(userAtom)
  const auth = getAuth(app);
  const [email, setEmail] = useState("");

  async function googleAuth() {
    signInWithPopup(auth, provider)
      .then((data) => {
        const credentials = GoogleAuthProvider.credentialFromResult(data);
        if (!credentials) {
          return;
        }
        console.log(data.user) 
        const {displayName, email, uid, photoURL} = data.user
        setUser({
          loading: false, 
          user: {
            email: email,
            name: displayName,
            photoURL,
            uid
          }
        })
        console.log(user)
      })
      .catch((error) => {
        console.log("error", error);
        console.log(
          "some loging error",
          GoogleAuthProvider.credentialFromError(error),
        );
      });
  }
  async function githubAuth() {
    await signInWithPopup(auth, provider)
      .then((data) => {
        const creds = GithubAuthProvider.credentialFromResult(data);
        if (!creds) {
          return;
        }
        const {displayName, email, uid, photoURL} = data.user
        setUser({
          loading: false, 
          user: {
            email,
            name: displayName,
            photoURL,
            uid
          }
        })
        console.log(user)
      })
      .catch((error) => console.log(error));
  }

  async function onSinginin() {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        console.log("email send successfully");
        window.localStorage.setItem("emailForSignIn", email);
        alert(`email successfully sent to ${email}`);
      })
      .catch((error) => console.log("error", error));
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} onClick={() => onSinginin()}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {" "}
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-evenly">
        <Button
          variant="outline"
          type="button"
          onClick={() => googleAuth()}
          className="w-40"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => githubAuth()}
          className="w-40"
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </div>
  );
}
