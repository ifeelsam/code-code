"use client";
import SignIn from "@/components/SignIn";
import { userAtom } from "@/store/atoms/user";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { app } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { split } from "postcss/lib/list";
export default function App() {
  const [user, setUser] = useRecoilState(userAtom);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const {email, displayName, uid, photoURL} = authUser 
        setUser({
          loading: false, 
          user: {
            email,
            displayName,
            photoURL,
            uid
          }
        });
        console.log("user details", user)
      } else {
        setUser({
          loading: true,
          user: null,
        });
        console.log("no loged in user");
      }
    });
    return () => unsubscribe()  
  }, []);


  console.log("user outside", user)
  const onSignout = () =>{
    signOut(auth)
    .then(() => {
      console.log("user signed out")
      setUser({
        loading: true, 
        user: null
      })
      return <SignIn/>
    })
    .catch((error) => console.error("error loging out : ", error))
  }
  if (user.loading) {
    <div>loading    </div>
  }
  if (!user.user) {
    return (
      <>
        <SignIn />
      </>
    );
  }
  return (
    <>
      <h1>hello, {user.user.displayName?.trim().split(" ")[0]} </h1>
      <Button onClick={onSignout}> signOut</Button>
    </>
  );
}
