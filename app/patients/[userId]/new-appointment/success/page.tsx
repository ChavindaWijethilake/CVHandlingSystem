"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Chatbot from "@/components/Chatbot";

const Success = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId") || "unknown-user";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      
      <Image src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
      
      
      <h2 className="header mt-6 text-green-500 text-2xl font-semibold">
        Your CV Upload was Successful!
      </h2>
      <p className="text-gray-400 mt-2 text-lg">
        Thank you for submitting your details. Our team will review your application shortly.
      </p>

      
      <div className="mt-6 flex flex-col gap-4 ">
       
        <Button className="shad-primary-btn" asChild>
          <Link href={"/patients/new-appointment/register"}>
            Back to Upload
          </Link>
        </Button>
        <Button className="shad-primary-btn" asChild>
          <Link href={"/patients/${userid}/new-appointment/voiceassist"}>
            Voice Assistant
          </Link>
        </Button>
      </div>
      <Chatbot />
    </div>
  );
};

export default Success;
