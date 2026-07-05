import { spawn } from "child_process";


export const githubRoutes = (req, res) => {
    console.log(req.body);
    res.json({ message: "Deployment triggered ..." })

    const bashChildProcess = spawn("bash", ["script.sh"]);

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