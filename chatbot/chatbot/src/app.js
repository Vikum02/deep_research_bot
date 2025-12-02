import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState } from "react";
import { Router, Routes, Route } from "@jac-client/utils";
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
  return __jacJsx("div", {"style": {"maxWidth": "720px", "margin": "24px auto", "padding": "16px"}}, [__jacJsx("h2", {"style": {"marginBottom": "8px"}}, ["Chat Bot"]), __jacJsx("div", {"style": {"color": "#666", "marginBottom": "12px"}}, ["Type a question"]), __jacJsx("div", {"style": {"height": "400px", "maxHeight": "400px", "overflowY": "auto", "border": "1px solid #e5e7eb", "borderRadius": "8px", "padding": "16px", "marginBottom": "16px", "backgroundColor": "#f9fafb"}}, [__jacJsx("div", {"style": {"color": "#9ca3af", "textAlign": "center", "padding": "40px 0"}}, ["Chat history will appear here..."])]), __jacJsx("textarea", {"value": currentMessage, "onChange": e => {
    setCurrentMessage(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, "rows": 5, "placeholder": "Ask me anything...", "style": {"width": "100%", "padding": "10px", "border": "1px solid #ddd", "borderRadius": "6px", "resize": "vertical", "boxSizing": "border-box"}}, []), __jacJsx("div", {"style": {"marginTop": "10px"}}, [__jacJsx("button", {"onClick": sendMessage, "disabled": loading || !currentMessage.trim(), "style": {"padding": "10px 14px", "border": "none", "borderRadius": "6px", "cursor": loading || !currentMessage.trim() ? "not-allowed" : "pointer", "background": loading || !currentMessage.trim() ? "#9ca3af" : "#3b82f6", "color": "#fff", "fontWeight": "600"}}, [loading ? "Sending\u2026" : "Send"])])]);
}
function app() {
  return __jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Chat, {}, [])}, [])])]);
}
export { Chat, app };
