import { spawn } from "child_process";
import crypto from "crypto";


export const githubRoutes = (req, res) => {
    console.log(req.headers);
    console.log(req.body);
    const givenSignature = req.header["x-hub-signature-256"];
    if (!givenSignature) {
        return res.status(400).json({ error: "Invalid signature!" })
    }
    const expectedSignature = crypto.createHmac("sha256", "mir-haadi977#@").update(JSON.stringify(req.body)).digest("hex");

    if (expectedSignature !== givenSignature) {
        return res.status(400).json({ error: "Invalid signature!!" })
    }
    res.json({ message: "Deployment triggered ..." })

    const bashChildProcess = spawn("bash", [`/home/ubuntu/deploy-frontend.sh`]);

    bashChildProcess.stdout.on("data", (data) => {
        process.stdout.write(data)
    });

    bashChildProcess.stderr.on("data", (data) => {
        process.stderr.write(data)
    });

    bashChildProcess.on("close", code => {
        if (!code) {
            console.log("script executed successfully...");
        } else {
            console.log("script execution failed!!");
        }
    });

    bashChildProcess.on("error", (err) => {
        console.log("Error occurred in spawning the process!", err);
    })

}
