import express from "express";
import fetch from "node-fetch";
const app = express();
const PORT = 3000;

app.get("/weather", async (req, res) => {
  try {
    const data = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=43.7&longitude=-79.42&current_weather=true"
    );
    res.json(await data.json());
  } catch {
    res.json({ error: "Weather API failed" });
  }
});

app.listen(PORT, () => console.log(`Weather API running on port ${PORT}`));

