import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState, useRef, useEffect } from "react";
import { Router, Routes, Route } from "@jac-client/utils";
import { Button, TextField, Paper, Box, Typography, Container, CircularProgress, Chip, Avatar, ThemeProvider, createTheme, Fade, Slide } from "@mui/material";
import { SmartToy, Send } from "@mui/icons-material";
let theme = createTheme({palette: {primary: {main: "#6366f1", light: "#818cf8", dark: "#4f46e5"}, secondary: {main: "#ec4899", light: "#f472b6", dark: "#db2777"}, background: {default: "#f8fafc", paper: "#ffffff"}, text: {primary: "#1e293b", secondary: "#64748b"}}, typography: {fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"}, shape: {borderRadius: 12}});
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
    let userMessageObj = {"text": user_msg, "sender": "user", "timestamp": Date.now()};
    setChatHistory(prev => {
      return prev.concat([userMessageObj]);
    });
    setCurrentMessage("");
    setLoading(true);
    try {
      let result = await __jacSpawn("chat_agent", "", {"userinput": user_msg, "formatted_history": formatted_history});
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
    chatContent = __jacJsx(Typography, {"variant": "body2", "sx": {textAlign: "center", py: 5, color: "#64748b", fontWeight: 500}}, ["Chat history will appear here..."]);
  } else {
    chatContent = __jacJsx(Box, {"sx": {display: "flex", flexDirection: "column", gap: 2}}, [chatHistory.map((msg, index) => {
      let alignment = "flex-start";
      let bgColor = "grey.200";
      let textColor = "text.primary";
      let slideDirection = "right";
      if (msg.sender === "user") {
        alignment = "flex-end";
        bgColor = "primary.main";
        textColor = "white";
        slideDirection = "left";
      }
      return __jacJsx(Slide, {"direction": slideDirection, "in": true, "timeout": 500, "key": msg.timestamp}, [__jacJsx(Box, {"sx": {display: "flex", justifyContent: alignment}}, [__jacJsx(Fade, {"in": true, "timeout": 800}, [__jacJsx(Box, {"sx": {maxWidth: "70%", padding: 1.5, borderRadius: 2, backgroundColor: bgColor, color: textColor, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease", "&:hover": {transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"}}}, [__jacJsx(Typography, {}, [msg.text])])])])]);
    })]);
  }
  return __jacJsx(Container, {"maxWidth": "md", "sx": {py: 3}}, [__jacJsx(Fade, {"in": true, "timeout": 1000}, [__jacJsx(Box, {"sx": {display: "flex", alignItems: "center", gap: 2, mb: 3, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"}}, [__jacJsx(Avatar, {"sx": {bgcolor: "primary.main", width: 56, height: 56, boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"}}, [__jacJsx(SmartToy, {"sx": {fontSize: 32}}, [])]), __jacJsx(Box, {}, [__jacJsx(Typography, {"variant": "h4", "component": "h1", "sx": {fontWeight: 700, color: "primary.main", textShadow: "0 2px 4px rgba(0,0,0,0.1)"}}, ["AI Chatbot"]), __jacJsx(Typography, {"variant": "body2", "sx": {color: "#64748b", fontWeight: 500}}, ["Ask me anything..."])])])]), __jacJsx(Fade, {"in": true, "timeout": 1200}, [__jacJsx(Paper, {"elevation": 0, "sx": {height: "400px", overflowY: "auto", p: 3, mb: 2, position: "relative", background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)", border: "3px solid transparent", borderRadius: "12px", backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box"}}, [__jacJsx(Box, {"sx": {position: "relative", zIndex: 1}}, [chatContent])])]), __jacJsx(Fade, {"in": true, "timeout": 1400}, [__jacJsx(Box, {"sx": {display: "flex", gap: 1, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"}}, [__jacJsx(TextField, {"fullWidth": true, "multiline": true, "rows": 3, "value": currentMessage, "onChange": e => {
    setCurrentMessage(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, "placeholder": "Type your message here...", "variant": "outlined", "sx": {backgroundColor: "white", borderRadius: 2, transition: "all 0.3s ease", "& .MuiOutlinedInput-root": {"&:hover fieldset": {borderColor: "primary.main"}, "&.Mui-focused fieldset": {borderColor: "primary.main", borderWidth: "2px"}}, "&:hover": {boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)"}}}, []), __jacJsx(Button, {"variant": "contained", "color": "primary", "onClick": sendMessage, "disabled": loading || !currentMessage.trim(), "sx": {minWidth: "64px", height: "auto", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", "&:hover": {background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", transform: "scale(1.1) rotate(5deg)", boxShadow: "0 8px 20px rgba(99, 102, 241, 0.6)"}, "&:active": {transform: "scale(0.95)", boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)"}, "&:disabled": {background: "rgba(99, 102, 241, 0.5)", transform: "none"}}}, [__jacJsx(Send, {"sx": {transition: "transform 0.3s ease", ".MuiButton-root:hover &": {transform: "translateX(3px)"}}}, [])])])])]);
}
function app() {
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
  }, []);
  return __jacJsx(ThemeProvider, {"theme": theme}, [__jacJsx(Box, {"sx": {minHeight: "100vh", width: "100vw", margin: 0, padding: 0, background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", position: "fixed", top: 0, left: 0, overflowY: "auto", py: 4}}, [__jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Chat, {}, [])}, [])])])])]);
}
export { Chat, app };
