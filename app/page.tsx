import Chatbot from "@/components/Chatbot";
import LoginForm from "@/components/forms/LoginForm";

import PasskeyModal from "@/components/PasskeyModal";


import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      
     <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">

        <LoginForm />
        <Chatbot/> 

      </div>
     </section>

    </div>
  );
}
