import serverless from "serverless-http";
import expressApp from "./app";

const functionName = "send";
const app = expressApp(functionName);
exports.handler = serverless(app);
