import express from "express";
import { githubRoutes } from "./routes/github.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	return res.json({message: "cicd server is running fine on production.."})
});

app.post("/webhooks/github", githubRoutes);


app.listen(5000, () => {
    console.log("Custom CI/CD server is running...");
});
