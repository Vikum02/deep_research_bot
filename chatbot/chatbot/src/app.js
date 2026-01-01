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
  let [awaitingClarification, setAwaitingClarification] = useState(false);
  let [originalQuestion, setOriginalQuestion] = useState("");
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
        }
      }
    }
    let input_to_send = user_msg;
    if (awaitingClarification) {
      input_to_send = originalQuestion + " - " + user_msg;
    }
    let userMessageObj = {"text": user_msg, "type": "user_message", "sender": "user", "timestamp": Date.now()};
    setChatHistory(prev => {
      return prev.concat([userMessageObj]);
    });
    setCurrentMessage("");
    setLoading(true);
    let result = await __jacSpawn("research_bot", "", {"userinput": input_to_send, "formatted_history": formatted_history});
    let reply_data = null;
    if (result && result.reports && result.reports.length > 0) {
      reply_data = result.reports[0];
    }
    if (!reply_data) {
      reply_data = {"type": "error", "message": "I apologize, but I'm having trouble generating a response. Could you try rephrasing?"};
    }
    let botMessageObj = {"data": reply_data, "type": reply_data.type, "sender": "bot", "timestamp": Date.now()};
    setChatHistory(prev => {
      return prev.concat([botMessageObj]);
    });
    let is_asking_clarification = reply_data.type === "clarification";
    if (is_asking_clarification && !awaitingClarification) {
      setAwaitingClarification(true);
      setOriginalQuestion(user_msg);
    } else if (awaitingClarification) {
      setAwaitingClarification(false);
      setOriginalQuestion("");
    }
    setLoading(false);
  }
  function renderUserMessage(msg) {
    return __jacJsx(Typography, {"sx": {whiteSpace: "pre-wrap", wordBreak: "break-word"}}, [msg.text]);
  }
  function renderClarification(msg) {
    console.log("=== CLARIFICATION DEBUG ===");
    console.log("msg.data:", msg.data);
    let raw_text = msg.data.text;
    console.log("raw_text:", raw_text);
    let lines = raw_text.split("\\n");
    console.log("lines:", lines);
    let questions_list = [];
    for (const line of lines) {
      let line_stripped = line.trim();
      if (line_stripped.indexOf("Q1:") === 0) {
        let q = line_stripped.replace("Q1:", "").trim();
        console.log("Found Q1:", q);
        questions_list.push(q);
      } else if (line_stripped.indexOf("Q2:") === 0) {
        q = line_stripped.replace("Q2:", "").trim();
        console.log("Found Q2:", q);
        questions_list.push(q);
      } else if (line_stripped.indexOf("Q3:") === 0) {
        q = line_stripped.replace("Q3:", "").trim();
        console.log("Found Q3:", q);
        questions_list.push(q);
      } else if (line_stripped.indexOf("Q4:") === 0) {
        q = line_stripped.replace("Q4:", "").trim();
        console.log("Found Q4:", q);
        questions_list.push(q);
      } else if (line_stripped.indexOf("Q5:") === 0) {
        q = line_stripped.replace("Q5:", "").trim();
        console.log("Found Q5:", q);
        questions_list.push(q);
      }
    }
    console.log("Final questions_list:", questions_list);
    return __jacJsx(Box, {}, [__jacJsx(Typography, {"sx": {mb: 2, fontWeight: 600}}, ["🔍 To provide the most relevant research, I need to understand better:"]), questions_list.map((q, idx) => {
      return __jacJsx(Typography, {"key": idx, "sx": {mb: 1.5, pl: 1}}, [idx + 1, ". ", q]);
    }), __jacJsx(Typography, {"sx": {mt: 2, fontStyle: "italic"}}, ["📝 Please answer these questions so I can conduct targeted research for you?"])]);
  }
  function renderMarkdownReport(msg) {
    console.log("MARKDOWN REPORT DEBUG");
    console.log("msg.data:", msg.data);
    let markdown = msg.data.markdown;
    let topic = msg.data.topic;
    let search_count = msg.data.metadata.search_count;
    console.log("markdown:", markdown);
    console.log("topic:", topic);
    console.log("search_count:", search_count);
    let sections = markdown.split("## ");
    console.log("sections length:", sections.length);
    let executive_summary = "";
    let key_findings = [];
    let content_sections = [];
    let i = 1;
    while (i < sections.length) {
      let section = sections[i];
      let section_lines = section.split("\\n");
      let section_title = section_lines[0].trim();
      let section_content = section_lines.slice(1).join("\\n").trim();
      console.log("Processing section:", section_title);
      if (section_title.indexOf("Executive Summary") !== -1) {
        executive_summary = section_content;
        console.log("Found Executive Summary");
      } else if (section_title.indexOf("Key Findings") !== -1) {
        console.log("Found Key Findings");
        let finding_lines = section_content.split("\\n");
        for (const finding_line of finding_lines) {
          let trimmed = finding_line.trim();
          if (trimmed.indexOf("- ") === 0) {
            key_findings.push(trimmed.replace("- ", "").trim());
          }
        }
        console.log("key_findings:", key_findings);
      } else if (section_title.length > 0) {
        if (section_content.indexOf("**Research Summary**") === -1 && section_content.indexOf("---") === -1) {
          content_sections.push({"title": section_title, "content": section_content});
          console.log("Added content section:", section_title);
        }
      }
      i = i + 1;
    }
    console.log("Final executive_summary:", executive_summary);
    console.log("Final key_findings:", key_findings);
    console.log("Final content_sections:", content_sections);
    return __jacJsx(Box, {}, [__jacJsx(Typography, {"variant": "h6", "sx": {mb: 2, fontWeight: 700}}, ["🔬 Deep Research Report"]), __jacJsx(Typography, {"variant": "subtitle2", "sx": {mb: 2, color: "text.secondary"}}, ["Topic: ", topic]), __jacJsx(Typography, {"variant": "subtitle1", "sx": {mb: 1, fontWeight: 600}}, ["📊 Executive Summary"]), __jacJsx(Typography, {"sx": {mb: 3, whiteSpace: "pre-wrap"}}, [executive_summary]), __jacJsx(Typography, {"variant": "subtitle1", "sx": {mb: 1, fontWeight: 600}}, ["🔍 Key Findings"]), key_findings.map((f, idx) => {
      return __jacJsx(Typography, {"key": idx, "sx": {mb: 1.5, pl: 2}}, ["• ", f]);
    }), content_sections.map((section, idx) => {
      return __jacJsx(Box, {"key": idx, "sx": {mt: 3}}, [__jacJsx(Typography, {"variant": "subtitle1", "sx": {mb: 1, fontWeight: 600}}, ["📈 ", section.title]), __jacJsx(Typography, {"sx": {whiteSpace: "pre-wrap", lineHeight: 1.7}}, [section.content])]);
    }), __jacJsx(Box, {"sx": {mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 2}}, [__jacJsx(Typography, {"variant": "subtitle2", "sx": {fontWeight: 600}}, ["📚 Research Summary"]), __jacJsx(Typography, {"variant": "body2"}, ["• Total searches conducted: ", search_count]), __jacJsx(Typography, {"variant": "body2"}, ["• Deep research with multiple sources per topic"]), __jacJsx(Typography, {"variant": "body2"}, ["• Personalized to your specific needs"])])]);
  }
  function renderError(msg) {
    return __jacJsx(Typography, {"sx": {color: "error.main"}}, [msg.data.message]);
  }
  function renderMessage(msg) {
    if (msg.sender === "user") {
      return renderUserMessage(msg);
    } else if (msg.type === "clarification") {
      return renderClarification(msg);
    } else if (msg.type === "research_report") {
      return renderMarkdownReport(msg);
    } else if (msg.type === "error") {
      return renderError(msg);
    } else {
      return __jacJsx(Typography, {}, ["Unsupported message type"]);
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
      return __jacJsx(Slide, {"direction": slideDirection, "in": true, "timeout": 500, "key": msg.timestamp}, [__jacJsx(Box, {"sx": {display: "flex", justifyContent: alignment}}, [__jacJsx(Fade, {"in": true, "timeout": 800}, [__jacJsx(Box, {"sx": {maxWidth: "70%", padding: 1.5, borderRadius: 2, backgroundColor: bgColor, color: textColor, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease", "&:hover": {transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"}}}, [renderMessage(msg)])])])]);
    })]);
  }
  return __jacJsx(Container, {"maxWidth": "md", "sx": {py: 3}}, [__jacJsx(Fade, {"in": true, "timeout": 1000}, [__jacJsx(Box, {"sx": {display: "flex", alignItems: "center", gap: 2, mb: 3, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"}}, [__jacJsx(Avatar, {"sx": {bgcolor: "primary.main", width: 56, height: 56, boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"}}, [__jacJsx(SmartToy, {"sx": {fontSize: 32}}, [])]), __jacJsx(Box, {}, [__jacJsx(Typography, {"variant": "h4", "component": "h1", "sx": {fontWeight: 700, color: "primary.main", textShadow: "0 2px 4px rgba(0,0,0,0.1)"}}, ["Deep Research Bot"]), __jacJsx(Typography, {"variant": "body2", "sx": {color: "#64748b", fontWeight: 500}}, ["Ask me anything..."])])])]), __jacJsx(Fade, {"in": true, "timeout": 1200}, [__jacJsx(Paper, {"elevation": 0, "sx": {height: "400px", overflowY: "auto", p: 3, mb: 2, position: "relative", background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)", border: "3px solid transparent", borderRadius: "12px", backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box"}}, [__jacJsx(Box, {"sx": {position: "relative", zIndex: 1}}, [chatContent])])]), __jacJsx(Fade, {"in": true, "timeout": 1400}, [__jacJsx(Box, {"sx": {display: "flex", gap: 1, background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)", padding: 2, borderRadius: 3, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"}}, [__jacJsx(TextField, {"fullWidth": true, "multiline": true, "rows": 3, "value": currentMessage, "onChange": e => {
    setCurrentMessage(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, "placeholder": "Type your message here...", "variant": "outlined", "disabled": loading, "sx": {backgroundColor: "white", borderRadius: 2, transition: "all 0.3s ease", "& .MuiOutlinedInput-root": {"&:hover fieldset": {borderColor: "primary.main"}, "&.Mui-focused fieldset": {borderColor: "primary.main", borderWidth: "2px"}}, "&:hover": {boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)"}}}, []), __jacJsx(Button, {"variant": "contained", "color": "primary", "onClick": sendMessage, "disabled": loading || !currentMessage.trim(), "sx": {minWidth: "64px", height: "auto", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", "&:hover": {background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", transform: "scale(1.1) rotate(5deg)", boxShadow: "0 8px 20px rgba(99, 102, 241, 0.6)"}, "&:active": {transform: "scale(0.95)", boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)"}, "&:disabled": {background: "rgba(99, 102, 241, 0.5)", transform: "none"}}}, [__jacJsx(Send, {}, [])])])])]);
}
function app() {
  return __jacJsx(ThemeProvider, {"theme": theme}, [__jacJsx(Box, {"sx": {minHeight: "100vh", width: "100vw", margin: 0, padding: 0, background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", position: "fixed", top: 0, left: 0, overflowY: "auto", py: 4}}, [__jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Chat, {}, [])}, [])])])])]);
}
export { Chat, app };
