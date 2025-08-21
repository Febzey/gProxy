import net from "net";
const targetHost = "simplyanarchy.net";
const targetPort = 25565;
const listenPort = 25565;
const server = net.createServer((clientSocket) => {
    console.log("New connection from", clientSocket.remoteAddress, clientSocket.remotePort);
    const targetSocket = net.connect(targetPort, targetHost, () => {
        console.log("Connected to target");
    });
    // Log data from client to server
    clientSocket.on("data", (data) => {
        console.log(`Client -> Server: ${data.length} bytes`, data.toString("hex").slice(0, 50), "...");
        targetSocket.write(data);
    });
    // Log data from server to client
    targetSocket.on("data", (data) => {
        console.log(`Server -> Client: ${data.length} bytes`, data.toString("hex").slice(0, 50), "...");
        clientSocket.write(data);
    });
    clientSocket.on("error", (err) => console.log("Client error:", err.message));
    targetSocket.on("error", (err) => console.log("Target error:", err.message));
    clientSocket.on("close", () => targetSocket.end());
    targetSocket.on("close", () => clientSocket.end());
});
server.listen(listenPort, () => {
    console.log(`Proxy listening on 0.0.0.0:${listenPort}`);
});
