import {
  Client,
  Account,
  ID,
  Databases,
  Avatars,
  Query,
} from "react-native-appwrite";

// Appwrite Configuration
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.enablero.aora",
  projectId: "676fc1b200098fbdf5ee",
  databaseId: "676fc338000089684390",
  userCollectionID: "676fc383003b0030e4de",
  videoCollectionId: "676fc3a0001f4c77a325",
  storageId: "676fc5260007183d653c",
};

// Initialize the Appwrite Client
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// Appwrite Service Instances
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

/**
 * Create a new user in Appwrite.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @param {string} userName - Username.
 */
export const createUser = async (email, password, userName) => {
  try {
    // Create an Appwrite account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );

    // Generate an avatar for the user
    const avatarUrl = avatars.getInitials(userName);

    // Sign in to create a session
    await signIn(email, password);

    // Add user data to the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionID,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        userName,
        avatar: avatarUrl.href,
      }
    );

    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw new Error(error.message || "Failed to create user");
  }
};

/**
 * Sign in a user with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 */
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error in signIn:", error);
    throw new Error(error.message || "Failed to sign in");
  }
};

/**
 * Get the currently logged-in user.
 */
export const getCurrentUser = async () => {
  try {
    // Fetch the current account
    const currentAccount = await account.get();

    if (!currentAccount || !currentAccount.$id) {
      throw new Error("User is not logged in");
    }

    // Fetch the corresponding user document
    const userDocs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionID,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (userDocs.documents.length === 0) {
      throw new Error("No user document found");
    }

    return userDocs.documents[0];
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw new Error(error.message || "Failed to fetch current user");
  }
};
