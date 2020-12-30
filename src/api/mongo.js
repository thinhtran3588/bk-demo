import mongoose from "mongoose";

const DB_CONNECTION_STRING =
  "mongodb+srv://demo:abc12345@cluster0.kcxmq.mongodb.net/test?retryWrites=true&w=majority";
const db = mongoose.connection
  .on("error", console.error.bind(console, "connection error:"))
  .once("open", function () {
    // we're connected!
    console.log("connected");
  });

mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
