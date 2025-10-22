import createDebug from "debug";
import mongoose from "mongoose";

const debug = createDebug("mi-lista:database");

const connectToDatabase = async (connectionString: string): Promise<void> => {
  try {
    await mongoose.connect(connectionString);

    mongoose.set("debug", true);
    debug("✅ Connected to dabase");
  } catch (error) {
    debug("❌ Error connecting to database:", error);
  }
};

export default connectToDatabase;
