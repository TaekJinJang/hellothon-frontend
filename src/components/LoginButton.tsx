"use client";

import { Button } from "./ui/button";
import Image from "next/image";
import InstagramLogo from "@icons/instagramIcon.png";
import React from "react";
import { makeOAuthUrl } from "@/utils";

export default function LoginButton() {
  function OAuthLogin() {
    window.location.href = makeOAuthUrl();
  }

  return (
    <div className="w-256 h-56 flex items-center space-x-2">
      <Button
        onClick={OAuthLogin}
        variant="outline"
        size="lg"
        className=" border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:shadow-lg transition-all duration-200 rounded-full shadow-md"
      >
        <Image src={InstagramLogo} alt="Instagram logo" width={24} height={24} priority className="inline-block" />
        <span>Sign in with Instagram</span>
      </Button>
    </div>
  );
}
