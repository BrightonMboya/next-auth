import { hashPassword } from "../../../../lib/auth";
import { connectToDatabase } from "../../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body; //getting access to the data sent by the form
    const { email, password } = data; // this are sent from the form

    // checking if the data we got is valid
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid Input, the password should be at least 7 char long",
      });
      return;
    }
    const client = await connectToDatabase();
    const db = client.db(); // making the connection to the db
    //check if the email already exists
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(402).json({ message: "User already exists" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password); // hashing the password

    //creating the collection on the db and adding the email and users
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}

export default handler;
