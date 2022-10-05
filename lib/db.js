import { MongoClient } from "mongodb";
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://tony:tonero@auth-1.1y8frle.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
