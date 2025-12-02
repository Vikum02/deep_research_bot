import from react { useState, useRef, useEffect }
import from "@jac-client/utils" { Router, Routes, Route }
import from '@mui/material' { 
    Button, 
    TextField, 
    Paper, 
    Box, 
    Typography, 
    Container,
    CircularProgress,
    Chip
}

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

    let chatContent = None;
    
    if (chatHistory.length == 0) {
        chatContent = <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
                textAlign: "center", 
                py: 5 
            }}
        >
            Chat history will appear here...
        </Typography>;
    } else {
        chatContent = <Box 
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
            }}
        >
            {chatHistory.map(lambda msg: any -> any {
                let alignment = "flex-start";
                let bgColor = "grey.200";
                let textColor = "text.primary";
                
                if (msg.sender == "user") {
                    alignment = "flex-end";
                    bgColor = "primary.main";
                    textColor = "white";
                }
                
                return <Box 
                    key={msg.timestamp}
                    sx={{
                        display: "flex",
                        justifyContent: alignment
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "70%",
                            padding: 1.5,
                            borderRadius: 2,
                            backgroundColor: bgColor,
                            color: textColor
                        }}
                    >
                        <Typography>
                            {msg.text}
                        </Typography>
                    </Box>
                </Box>;
            })}
        </Box>;
    }

    return <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            AI Chatbot
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ask me anything...
        </Typography>

        <Paper 
            elevation={3}
            sx={{
                height: "400px",
                overflowY: "auto",
                p: 2,
                mb: 2,
                backgroundColor: "#f9fafb"
            }}
        >
            {chatContent}
        </Paper>

        <TextField
            fullWidth
            multiline
            rows={4}
            value={currentMessage}
            onChange={lambda e: any -> None { setCurrentMessage(e.target.value); }}
            onKeyPress={lambda e: any -> None {
                if (e.key == "Enter" and e.shiftKey == False) { 
                    e.preventDefault(); 
                    sendMessage(); 
                }
            }}
            placeholder="Type your message here..."
            variant="outlined"
            sx={{ mb: 2 }}
        />

        <Button
            variant="contained"
            color="primary"
            onClick={sendMessage}
            disabled={loading or not currentMessage.trim()}
            fullWidth
            size="large"
        >
            {("Sending…" if loading else "Send")}
        </Button>
    </Container>;
}

def app() -> any {
    return <Router>
        <Routes>
            <Route path="/" element={<Chat />} />
        </Routes>
    </Router>;
}