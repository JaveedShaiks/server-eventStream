const express = require("express");
const cors = require("cors");
const { JsxEmit } = require("typescript");

const app = express();
const PORT = 5000;

app.use(cors());


app.use(express.json());



const commentaryData = [
    "Team A scores a goal!",
    "Fantastic save by the goalkeeper!",
    "Yellow card issued to Player X.",
    "What a brilliant pass!",
    "Team B equalizes the score!",
    "Missed opportunity, that was close!",
    "Player Y is substituted in.",
    "The referee checks the VAR.",
    "Corner kick for Team A.",
    "Final whistle! Match ends in a draw."
];

const matchEvents = [
    { id: 1, event: "Team A scores a goal!", type: "goal", timestamp: "00:12:30" },
    { id: 2, event: "Fantastic save by the goalkeeper!", type: "save", timestamp: "00:18:45" },
    { id: 3, event: "Yellow card issued to Player X.", type: "yellow_card", timestamp: "00:25:10" },
    { id: 4, event: "What a brilliant pass!", type: "assist", timestamp: "00:30:22" },
    { id: 5, event: "Team B equalizes the score!", type: "goal", timestamp: "00:40:05" },
    { id: 6, event: "Missed opportunity, that was close!", type: "miss", timestamp: "00:47:58" },
    { id: 7, event: "Player Y is substituted in.", type: "substitution", timestamp: "00:55:32" },
    { id: 8, event: "The referee checks the VAR.", type: "var_review", timestamp: "01:05:21" },
    { id: 9, event: "Corner kick for Team A.", type: "corner", timestamp: "01:15:43" },
    { id: 10, event: "Final whistle! Match ends in a draw.", type: "full_time", timestamp: "01:30:00" }
];

app.get("/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    let index = 0;
    const interval = setInterval(() => {
        if (index >= commentaryData.length) {
            clearInterval(interval);
            return;
        }
        const data = JSON.stringify({
            id: index + 1,
            message: commentaryData[index],
            timestamp: new Date().toISOString(),
        });
        res.write(`data: ${data}\n\n`);
        index++;
    }, 3000);
    
    req.on("close", () => {
        clearInterval(interval);
    });
});

app.get("/", (req, res) => {
    res.send('server is running');

})

app.get("/list", (req, res) => {
    const datalist = JSON.stringify(matchEvents)
    res.send(datalist);

})

app.listen(PORT, () => console.log(`SSE Server running on port ${PORT}`));
