import from byllm.lib { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.4,
    max_tokens=300
);

def ask_llm(query: str) -> str by llm();

walker chat_agent {
    has userinput: str;

    can chat with `root entry {
        response = ask_llm(self.userinput);
        report response;
    }
}

cl import from react { useState }
cl import from "@jac-client/utils" { Router, Routes, Route }

cl {
    def Chat() -> any {
        let [message, setMessage] = useState("");
        let [reply, setReply] = useState("");
        let [loading, setLoading] = useState(false);

        async def sendMessage() -> None {
            if loading { return; }
            if not message.trim() { return; }

            let user_msg = message.trim();
            setLoading(true);

            try {
                let result = root spawn chat_agent(userinput = message);

                let reply_text = "";
                if (result and result.reports and result.reports.length > 0) {
                    let r = result.reports[0];

                    if (Array.isArray(r) and r.length > 0) {
                        reply_text = "" + r[0];
                    } elif (r) {
                        reply_text = "" + r;
                    }
                }

                setReply(reply_text);
            } finally {
                setLoading(false);
            }
        }

        return <div style={{ "maxWidth": "720px", "margin": "24px auto", "padding": "16px" }}>
            <h2 style={{ "marginBottom": "8px" }}>Chat Bot</h2>
            <div style={{ "color": "#666", "marginBottom": "12px" }}>Type a question</div>

            <textarea
                value={message}
                onChange={lambda e: any -> None { setMessage(e.target.value); }}
                onKeyPress={lambda e: any -> None {
                    if (e.key == "Enter" and e.shiftKey == False) { e.preventDefault(); sendMessage(); }
                }}
                rows={5}
                placeholder="Ask me anything..."
                style={{
                    "width": "100%",
                    "padding": "10px",
                    "border": "1px solid #ddd",
                    "borderRadius": "6px",
                    "resize": "vertical",
                    "boxSizing": "border-box"
                }}
            />

            <div style={{ "marginTop": "10px" }}>
                <button
                    onClick={sendMessage}
                    disabled={loading or not message.trim()}
                    style={{
                        "padding": "10px 14px",
                        "border": "none",
                        "borderRadius": "6px",
                        "cursor": ("not-allowed" if (loading or not message.trim()) else "pointer"),
                        "background": ("#9ca3af" if (loading or not message.trim()) else "#3b82f6"),
                        "color": "#fff",
                        "fontWeight": "600"
                    }}
                >
                    {("Sending…" if loading else "Send")}
                </button>
            </div>

            {( <div style={{
                    "marginTop": "14px",
                    "padding": "12px",
                    "background": "#f9fafb",
                    "border": "1px solid #e5e7eb",
                    "borderRadius": "6px",
                    "whiteSpace": "pre-wrap"
                }}>{reply}</div>
            ) if reply else None}
        </div>;
    }

    def app() -> any {
        return <Router>
            <Routes>
                <Route path="/" element={<Chat />} />
            </Routes>
        </Router>;
    }
}
