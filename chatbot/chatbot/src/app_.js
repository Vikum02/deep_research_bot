import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState } from "react";
function app() {
  let [inputText, setInputText] = useState("");
  let [resultObj, setResultObj] = useState(null);
  let [loading, setLoading] = useState(false);
  async function handleSend() {
    if (loading) {
      return;
    }
    if (!inputText.trim()) {
      return;
    }
    setLoading(true);
    try {
      let result = await jac.run("chat_bot.reply", {"message": inputText});
      let out = null;
      if (result && result.reports && result.reports.length > 0) {
        let r = result.reports[0];
        if (r && r.reply) {
          out = r;
        } else if (Array.isArray(r) && r.length > 0 && r[0] && r[0].reply) {
          out = r[0];
        } else {
          out = {"reply": "" + r, "original": inputText};
        }
      } else {
        out = {"reply": "", "original": inputText};
      }
      setResultObj(out);
    } finally {
      setLoading(false);
    }
  }
  return __jacJsx("div", {"style": {"maxWidth": "760px", "margin": "24px auto", "padding": "20px"}}, [__jacJsx("h1", {"style": {"marginBottom": "6px"}}, ["AI Chatbot"]), __jacJsx("div", {"style": {"color": "#555", "marginBottom": "14px"}}, ["Type a message and get an instant AI reply"]), __jacJsx("div", {"style": {"marginBottom": "10px"}}, [__jacJsx("textarea", {"value": inputText, "onChange": e => {
    setInputText(e.target.value);
  }, "onKeyPress": e => {
    if (e.key === "Enter" && e.shiftKey === false && !loading) {
      e.preventDefault();
      handleSend();
    }
  }, "rows": 6, "placeholder": "Ask anything...", "style": {"width": "100%", "padding": "12px", "border": "1px solid #ddd", "borderRadius": "8px", "fontFamily": "inherit", "resize": "vertical", "boxSizing": "border-box"}}, [])]), __jacJsx("div", {}, [__jacJsx("button", {"onClick": handleSend, "disabled": loading || !inputText.trim(), "style": {"padding": "10px 16px", "border": "none", "borderRadius": "8px", "cursor": loading || !inputText.trim() ? "not-allowed" : "pointer", "background": loading || !inputText.trim() ? "#9ca3af" : "#3b82f6", "color": "#fff", "fontWeight": "600"}}, [loading ? "\u23f3 Sending\u2026" : "\u2728 Send"])]), loading ? __jacJsx("div", {"style": {"marginTop": "16px", "color": "#666"}}, ["Thinking…"]) : resultObj ? __jacJsx("div", {"style": {"marginTop": "18px"}}, [__jacJsx("div", {"style": {"padding": "14px", "background": "#f9fafb", "border": "1px solid #e5e7eb", "borderRadius": "8px", "whiteSpace": "pre-wrap", "marginBottom": "10px"}}, [__jacJsx("strong", {}, ["Assistant:"]), __jacJsx("br", {}, []), resultObj.reply]), __jacJsx("div", {"style": {"padding": "10px", "borderLeft": "3px solid #e5e7eb", "color": "#555", "whiteSpace": "pre-wrap"}}, [__jacJsx("strong", {}, ["Original:"]), " ", resultObj.original])]) : null]);
}
export { app };
