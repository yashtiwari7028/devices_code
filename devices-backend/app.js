const express = require("express");
const fs = require("fs");
const mqtt = require("mqtt");
const { DateTime } = require("luxon");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3000;

// Middleware to enable CORS for all routes
app.use(cors());

// MQTT configuration
const mqttTopic = "#";
const mqttHostname = "143.244.142.93";
const mqttPort = 1883;
const mqttUsername = "";
const mqttPassword = "";

const client = mqtt.connect(`mqtt://${mqttHostname}:${mqttPort}`, {
  username: mqttUsername,
  password: mqttPassword,
  keepalive: 60,
  clientId: "mqtt-js-client",
  clean: true,
  will: {
    topic: "your/will/topic", // Change to your own will topic
    payload: "Connection lost", // Will message
  },
});

// Connect to MQTT broker
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(mqttTopic);
});

// Handle MQTT messages
client.on("message", (messageTopic, messagePayload) => {
  const date_time = DateTime.now().toISO();

  try {
    const file1 = fs.createWriteStream(`./${messageTopic}.txt`, {
      flags: "a",
    });
    file1.write(
      `${date_time}, Topic: ${messageTopic}, Data: ${messagePayload.toString()}\n`
    );
    file1.close();
  } catch (error) {
    console.error("Error writing to file:", error);
  }
});

// Handle MQTT errors
client.on("error", (error) => {
  console.error("MQTT error:", error);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  client.end(() => {
    console.log("Disconnected from MQTT broker");
    process.exit(0);
  });
});

// API endpoint to get text file content
app.get("/api/getTextFileContent1", (req, res) => {
  // Read the text file
  fs.readFile("866262033228577.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading the text file" });
    }
    // Return the file content as JSON
    res.json({ content: data });
  });
});

app.get("/api/getTextFileContent2", (req, res) => {
  // Read the text file
  fs.readFile("866029031550231.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading the text file" });
    }
    // Return the file content as JSON
    res.json({ content: data });
  });
});
app.get("/api/getTextFileContent3", (req, res) => {
  // Read the text file
  fs.readFile("866262032586405.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading the text file" });
    }
    // Return the file content as JSON
    res.json({ content: data });
  });
});

app.get("/api/getTextFileContent4", (req, res) => {
  // Read the text file
  fs.readFile("867856031706887.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading the text file" });
    }
    // Return the file content as JSON
    res.json({ content: data });
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
