"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { CustomerFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser} from "@/lib/actions/customer.action"
import { FormFieldType } from "./LoginForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GenderOptions, CustomerFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image";
import FileUploader from "../FileUploader"
import { Button } from "../ui/button"
import Link from "next/link"

const RegisterForm = ({ user }: {user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof CustomerFormValidation>>({
    resolver: zodResolver(CustomerFormValidation),
    defaultValues: {
      ...CustomerFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof CustomerFormValidation>) {
    setIsLoading(true);
  
    let formData;
    if (values.identificationDocument?.length) {
      const file = values.identificationDocument[0];
      formData = new FormData();
      formData.append("blobFile", file);
      formData.append("fileName", file.name);
    }
  
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        identificationDocument: formData || null, 
      };
  
      //@ts-ignore
      const patient = await registerPatient(patientData);
  
      if (patient) {
        // Send email
        await fetch("/api/sendEmail", {
          method: "POST",
          body: JSON.stringify({ email: values.email, name: values.name }),
        });
  
        // Send SMS
        await fetch("/api/sendSMS", {
          method: "POST",
          body: JSON.stringify({ phone: values.phone, name: values.name }),
        });
  
        router.push(`/patients/${user.$id}/new-appointment/success`);
      }
    } catch (error) {
      console.log(error);
    }
  
    setIsLoading(false);
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="space-y-12 flex-1 pt-20">
        <section className="space-y-4">
          <h1 className="header text-cyan-400"> Upload Your CV Here </h1>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            
          </div>
        </section>
        
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Enter name in full"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email address"
              placeholder="Enter your Email"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
        </div>

        
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Upload your CV here"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />

          

<         div className="flex gap-4 mt-6">
            
            <SubmitButton  isLoading={isLoading} className="shad-primary-btn w-full">
              <Link href="/patients/${user.$id}/new-appointment/success" className="cursor-pointer text-center">
                Get Started
              </Link>
            </SubmitButton>

            <Button className="shad-primary-btn w-full" asChild>
              <Link href="/" className="cursor-pointer text-center">
                <p>Back to Login</p>
              </Link>
            </Button>
        </div>
      </form>
    </Form>
  )
}

export default RegisterForm