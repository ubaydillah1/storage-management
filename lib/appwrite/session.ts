// Edge-compatible functions

import { Client, Account } from "node-appwrite";
import { appwriteConfig } from "./config";

export async function validateUserSession(session: string) {
  try {
    const client = new Client()
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);

    const account = new Account(client.setSession(session));
    return await account.get();
  } catch {
    return null;
  }
}
