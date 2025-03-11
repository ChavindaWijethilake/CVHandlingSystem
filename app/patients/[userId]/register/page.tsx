import React from 'react'
import Image from "next/image";
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/customer.action';
import Link from 'next/link';
import Chatbot from '@/components/Chatbot';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  
  return (
    <div className="flex h-screen max-h-screen">
     <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
         

        <RegisterForm user={user} />
        <Chatbot/>

        
        
      </div>
     </section>

    </div>
  )
}

export default Register