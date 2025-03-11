"use server";

import { ID, Query } from "node-appwrite";
import {
    BUCKET_ID,
    DATABASE_ID,
    databases,
    ENDPOINT,
    CUSTOMER_COLLECTION_ID,
    PROJECT_ID,
    storage,
    users
} from "../appwrite.config";

import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
    try {
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      )
  
      return parseStringify(newUser);
    } catch (error: any) {
      if (error && error?.code === 409) {
        const documents = await users.list([
            Query.equal("email", [user.email])
        ])

        return documents?.users[0];
      }
    }
}

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error("An error occurred while retrieving the user details:", error);
  }
}

export const getCustomer = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      CUSTOMER_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    
    return parseStringify(Customer.documents[0]);
  } catch (error) {
    console.error("An error occurred while retrieving the user details:", error);
  }
}
