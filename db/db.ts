import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import path from "path";

const dbPath = path.resolve(__dirname, "./../data/mysqlite3.db");
const client = createClient({ url: `file:${dbPath}` });

export const db = drizzle(client);
