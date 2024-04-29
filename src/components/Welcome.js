import React from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Logo from "../img/logo.png";

const Welcome = () => {
  const { id } = useParams();

  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate(`/chat/${id}`);
  };

  return !user ? (
    <div className="flex flex-col items-center h-screen bg-slate-100 pt-10">
      <img src={Logo} alt="logo" className="w-48 h-48 mb-5" />
      <main className="flex flex-col items-center justify-center w-3/6 p-4 bg-white rounded-lg shadow-lg">
        <p className="text-2xl font-bold text-center">
          Welcome to the ChitChat! Click the button below to sign in with your
          Google account.
        </p>
        <button className="sign-in">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
            type="button"
            className="mt-4"
          />
        </button>
      </main>
    </div>
  ) : (
    navigate(`/chat/${id}`)
  );
};

export default Welcome;
