import { Models } from "node-appwrite";

export interface Customer extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  identificationDocument: FormData | undefined;
  
}
