import net from "net";

const targetHost = "simplyanarchy.net";
const targetPort = 25565;

const listenPort = 25565;

const server = net.createServer((clientSocket) => {
  console.log("New connection from", clientSocket.remoteAddress, clientSocket.remotePort);

  const targetSocket = net.connect(targetPort, targetHost, () => {
    console.log("Connected to target");
  });

  clientSocket.on("error", (err) => console.log("Client error:", err.message));
  targetSocket.on("error", (err) => console.log("Target error:", err.message));

  clientSocket.on("close", () => targetSocket.end());
  targetSocket.on("close", () => clientSocket.end());
});

server.listen(listenPort, () => {
  console.log(`Proxy listening on 0.0.0.0:${listenPort}`);
});
