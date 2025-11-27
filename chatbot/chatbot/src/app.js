import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState } from "react";
import { Router, Routes, Route } from "@jac-client/utils";
function Chat() {
  let [message, setMessage] = useState("");
  let [reply, setReply] = useState("");
  let [loading, setLoading] = useState(false);
  async function sendMessage() {
    if (loading) {
      return;
    }
    if (!message.trim()) {
      return;
    }
    let user_msg = message.trim();
    setLoading(true);
    try {
      let result = await __jacSpawn("chat_agent", "", {"message": message});
      let reply_text = "";
      if (result && result.reports && result.reports.length > 0) {
        let r = result.reports[0];
        if (Array.isArray(r) && r.length > 0) {
          reply_text = "" + r[0];
        } else if (r) {
          reply_text = "" + r;
        }
      }
      setReply(reply_text);
    } finally {
      setLoading(false);
    }
  }
  return __jacJsx("div", {"style": {"maxWidth": "720px", "margin": "24px auto", "padding": "16px"}}, [__jacJsx("h2", {"style": {"marginBottom": "8px"}}, ["Chat Bot"]), __jacJsx("div", {"style": {"color": "#666", "marginBottom": "12px"}}, ["Type a question"]), __jacJsx("textarea", {"value": message, "onChange": e => {
    setMessage(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  }, "rows": 5, "placeholder": "Ask me anything...", "style": {"width": "100%", "padding": "10px", "border": "1px solid #ddd", "borderRadius": "6px", "resize": "vertical", "boxSizing": "border-box"}}, []), __jacJsx("div", {"style": {"marginTop": "10px"}}, [__jacJsx("button", {"onClick": sendMessage, "disabled": loading || !message.trim(), "style": {"padding": "10px 14px", "border": "none", "borderRadius": "6px", "cursor": loading || !message.trim() ? "not-allowed" : "pointer", "background": loading || !message.trim() ? "#9ca3af" : "#3b82f6", "color": "#fff", "fontWeight": "600"}}, [loading ? "Sending\u2026" : "Send"])]), reply ? __jacJsx("div", {"style": {"marginTop": "14px", "padding": "12px", "background": "#f9fafb", "border": "1px solid #e5e7eb", "borderRadius": "6px", "whiteSpace": "pre-wrap"}}, [reply]) : null]);
}
function app() {
  return __jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Chat, {}, [])}, [])])]);
}
export { Chat, app };
