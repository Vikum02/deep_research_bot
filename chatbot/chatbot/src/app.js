import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState, useRef, useEffect } from "react";
import { Router, Routes, Route } from "@jac-client/utils";
import { Button, TextField, Paper, Box, Typography, Container, CircularProgress, Chip } from "@mui/material";
function Chat() {
  let [currentMessage, setCurrentMessage] = useState("");
  let [chatHistory, setChatHistory] = useState([]);
  let [loading, setLoading] = useState(false);
  async function sendMessage() {
    if (loading) {
      return;
    }
    if (!currentMessage.trim()) {
      return;
    }
    let user_msg = currentMessage.trim();
    let formatted_history = "";
    if (chatHistory.length > 0) {
      formatted_history = "Previous conversation:\\n";
      for (const msg of chatHistory) {
        if (msg.sender === "user") {
          formatted_history += "User: " + msg.text + "\\n";
        } else {
          formatted_history += "Bot: " + msg.text + "\\n";
        }
      }
    }
    console.log("formatted_history:", formatted_history);
    let userMessageObj = {"text": user_msg, "sender": "user", "timestamp": Date.now()};
    setChatHistory(prev => {
      return prev.concat([userMessageObj]);
    });
    setCurrentMessage("");
    setLoading(true);
    try {
      let result = await __jacSpawn("chat_agent", "", {"userinput": user_msg, "formatted_history": formatted_history});
      console.log("LLM result:", result);
      let reply_text = "";
      if (result && result.reports && result.reports.length > 0) {
        let r = result.reports[0];
        if (Array.isArray(r) && r.length > 0) {
          reply_text = "" + r[0];
        } else if (r) {
          reply_text = "" + r;
        }
      }
      let botMessageObj = {"text": reply_text, "sender": "bot", "timestamp": Date.now()};
      setChatHistory(prev => {
        return prev.concat([botMessageObj]);
      });
    } finally {
      setLoading(false);
    }
  }
  let chatContent = null;
  if (chatHistory.length === 0) {
    chatContent = __jacJsx(Typography, {"variant": "body2", "color": "text.secondary", "sx": {textAlign: "center", py: 5}}, ["Chat history will appear here..."]);
  } else {
    chatContent = __jacJsx(Box, {"sx": {display: "flex", flexDirection: "column", gap: 2}}, [chatHistory.map(msg => {
      let alignment = "flex-start";
      let bgColor = "grey.200";
      let textColor = "text.primary";
      if (msg.sender === "user") {
        alignment = "flex-end";
        bgColor = "primary.main";
        textColor = "white";
      }
      return __jacJsx(Box, {"key": msg.timestamp, "sx": {display: "flex", justifyContent: alignment}}, [__jacJsx(Box, {"sx": {maxWidth: "70%", padding: 1.5, borderRadius: 2, backgroundColor: bgColor, color: textColor}}, [__jacJsx(Typography, {}, [msg.text])])]);
    })]);
  }
  return __jacJsx(Container, {"maxWidth": "md", "sx": {py: 3}}, [__jacJsx(Typography, {"variant": "h4", "component": "h1", "gutterBottom": true}, ["AI Chatbot"]), __jacJsx(Typography, {"variant": "body2", "color": "text.secondary", "sx": {mb: 2}}, ["Ask me anything..."]), __jacJsx(Paper, {"elevation": 3, "sx": {height: "400px", overflowY: "auto", p: 2, mb: 2, backgroundColor: "#f9fafb"}}, [chatContent]), __jacJsx(TextField, {"fullWidth": true, "multiline": true, "rows": 4, "value": currentMessage, "onChange": e => {
    setCurrentMessage(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, "placeholder": "Type your message here...", "variant": "outlined", "sx": {mb: 2}}, []), __jacJsx(Button, {"variant": "contained", "color": "primary", "onClick": sendMessage, "disabled": loading || !currentMessage.trim(), "fullWidth": true, "size": "large"}, [loading ? "Sending\u2026" : "Send"])]);
}
function app() {
  return __jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Chat, {}, [])}, [])])]);
}
export { Chat, app };
