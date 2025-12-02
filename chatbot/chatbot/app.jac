import from byllm.lib { Model }

glob llm = Model(
    model_name="gemini/gemini-2.0-flash",
    temperature=0.4,
    max_tokens=300
);
def ask_llm(current_question: str, conversation_history: str) -> str by llm();

walker chat_agent {
    has userinput: str;
    has formatted_history: str;

    can chat with `root entry {
        response = ask_llm(self.userinput, self.formatted_history);
        report response;
    }
}

cl import from react { useState }
cl import from "@jac-client/utils" { Router, Routes, Route }

cl {
    def Chat() -> any {
        let [currentMessage, setCurrentMessage] = useState("");
        let [chatHistory, setChatHistory] = useState([]);
        let [loading, setLoading] = useState(false);

        async def sendMessage() -> None {
    if loading { return; }
    if not currentMessage.trim() { return; }

    let user_msg = currentMessage.trim();
    
    let formatted_history = "";
    
    if (chatHistory.length > 0) {
        formatted_history = "Previous conversation:\n";
        
        for msg in chatHistory {
            if (msg.sender == "user") {
                formatted_history += "User: " + msg.text + "\n";
            } else {
                formatted_history += "Bot: " + msg.text + "\n";
            }
        }
    }
    console.log("formatted_history:", formatted_history);

    let userMessageObj = {
        "text": user_msg,
        "sender": "user",
        "timestamp": Date.now()
    };
    
    setChatHistory(lambda prev: any -> any { 
        return prev.concat([userMessageObj]); 
    });
    
    setCurrentMessage("");
    
    setLoading(true);

    try {
        let result = root spawn chat_agent(
            userinput = user_msg,
            formatted_history = formatted_history
        );
        console.log("LLM result:", result);
        let reply_text = "";
        if (result and result.reports and result.reports.length > 0) {
            let r = result.reports[0];

            if (Array.isArray(r) and r.length > 0) {
                reply_text = "" + r[0];
            } elif (r) {
                reply_text = "" + r;
            }
        }

        let botMessageObj = {
            "text": reply_text,
            "sender": "bot",
            "timestamp": Date.now()
        };
        
        setChatHistory(lambda prev: any -> any { 
            return prev.concat([botMessageObj]); 
        });

    } finally {
        setLoading(false);
    }
}

        return <div style={{ "maxWidth": "720px", "margin": "24px auto", "padding": "16px" }}>
            <h2 style={{ "marginBottom": "8px" }}>Chat Bot</h2>
            <div style={{ "color": "#666", "marginBottom": "12px" }}>Type a question</div>

            <div style={{
                "height": "400px",
                "maxHeight": "400px",
                "overflowY": "auto",
                "border": "1px solid #e5e7eb",
                "borderRadius": "8px",
                "padding": "16px",
                "marginBottom": "16px",
                "backgroundColor": "#f9fafb"
            }}>
                <div style={{ "color": "#9ca3af", "textAlign": "center", "padding": "40px 0" }}>
                    Chat history will appear here...
                </div>
            </div>

            <textarea
                value={currentMessage}
                onChange={lambda e: any -> None { setCurrentMessage(e.target.value); }}
                onKeyPress={lambda e: any -> None {
                    if (e.key == "Enter" and e.shiftKey == False) { 
                        e.preventDefault(); 
                        sendMessage(); 
                    }
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
                    disabled={loading or not currentMessage.trim()}
                    style={{
                        "padding": "10px 14px",
                        "border": "none",
                        "borderRadius": "6px",
                        "cursor": ("not-allowed" if (loading or not currentMessage.trim()) else "pointer"),
                        "background": ("#9ca3af" if (loading or not currentMessage.trim()) else "#3b82f6"),
                        "color": "#fff",
                        "fontWeight": "600"
                    }}
                >
                    {("Sending…" if loading else "Send")}
                </button>
            </div>
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