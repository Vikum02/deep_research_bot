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
    Chip,
    Avatar,
    ThemeProvider,
    createTheme,
    Fade,
    Slide
}
import from '@mui/icons-material' {
    SmartToy,
    Send
}

glob theme = createTheme({
    palette: {
        primary: {
            main: "#6366f1",
            light: "#818cf8",
            dark: "#4f46e5"
        },
        secondary: {
            main: "#ec4899",
            light: "#f472b6",
            dark: "#db2777"
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff"
        },
        text: {
            primary: "#1e293b",
            secondary: "#64748b"
        }
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif"
    },
    shape: {
        borderRadius: 12
    }
});

def Chat() -> any {
    let [currentMessage, setCurrentMessage] = useState("");
    let [chatHistory, setChatHistory] = useState([]);
    let [loading, setLoading] = useState(false);

    let [awaitingClarification, setAwaitingClarification] = useState(false);
    let [originalQuestion, setOriginalQuestion] = useState("");

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
                    formatted_history += "Assistant: " + msg.text + "\n";
                }
            }
        }

        let input_to_send = user_msg;
        if (awaitingClarification) {
            input_to_send = originalQuestion + " - " + user_msg;
        }

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

        let result = root spawn chat_bot(
            userinput = input_to_send,
            formatted_history = formatted_history
        );

        let reply_text = "";
        if (result and result.reports and result.reports.length > 0) {
            let report = result.reports[0];
            if (Array.isArray(report)) {
                reply_text = String(report[0] or "");
            } else {
                reply_text = String(report or "");
            }
        }

        if (not reply_text or not reply_text.trim()) {
            reply_text = "I apologize, but I'm having trouble generating a response. Could you try rephrasing?";
        }

        let botMessageObj = {
            "text": reply_text,
            "sender": "bot",
            "timestamp": Date.now()
        };
        
        setChatHistory(lambda prev: any -> any { 
            return prev.concat([botMessageObj]); 
        });

        let is_asking_clarification = reply_text.trim().endsWith("?");
        
        if (is_asking_clarification and not awaitingClarification) {
            setAwaitingClarification(true);
            setOriginalQuestion(user_msg);
        } elif (awaitingClarification) { 
            setAwaitingClarification(false);
            setOriginalQuestion("");
        }

        setLoading(false);
    }

    let chatContent = None;
    
    if (chatHistory.length == 0) {
        chatContent = <Typography 
            variant="body2" 
            sx={{ 
                textAlign: "center", 
                py: 5,
                color: "#64748b",
                fontWeight: 500
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
            {chatHistory.map(lambda msg: any, index: number -> any {
                let alignment = "flex-start";
                let bgColor = "grey.200";
                let textColor = "text.primary";
                let slideDirection = "right";
                
                if (msg.sender == "user") {
                    alignment = "flex-end";
                    bgColor = "primary.main";
                    textColor = "white";
                    slideDirection = "left";
                }
                
                return <Slide
                    direction={slideDirection}
                    in={True}
                    timeout={500}
                    key={msg.timestamp}
                >
                    <Box 
                        sx={{
                            display: "flex",
                            justifyContent: alignment
                        }}
                    >
                        <Fade in={True} timeout={800}>
                            <Box
                                sx={{
                                    maxWidth: "70%",
                                    padding: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: bgColor,
                                    color: textColor,
                                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                                    }
                                }}
                            >
                                <Typography>
                                    {msg.text}
                                </Typography>
                            </Box>
                        </Fade>
                    </Box>
                </Slide>;
            })}
        </Box>;
    }

    return <Container maxWidth="md" sx={{ py: 3 }}>
        <Fade in={True} timeout={1000}>
            <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2,
                mb: 3,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                padding: 2,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            }}>
                <Avatar sx={{ 
                    bgcolor: "primary.main",
                    width: 56,
                    height: 56,
                    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"
                }}>
                    <SmartToy sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                    <Typography variant="h4" component="h1" sx={{ 
                        fontWeight: 700,
                        color: "primary.main",
                        textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}>
                        AI Chatbot
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        color: "#64748b",
                        fontWeight: 500
                    }}>
                        Ask me anything...
                    </Typography>
                </Box>
            </Box>
        </Fade>

        <Fade in={True} timeout={1200}>
            <Paper 
                elevation={0}
                sx={{
                    height: "400px",
                    overflowY: "auto",
                    p: 3,
                    mb: 2,
                    position: "relative",
                    
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                    
                    border: "3px solid transparent",
                    borderRadius: "12px",
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), linear-gradient(135deg, #6366f1, #ec4899, #8b5cf6)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box"
                }}
            >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                    {chatContent}
                </Box>
            </Paper>
        </Fade>

        <Fade in={True} timeout={1400}>
            <Box sx={{ 
                display: "flex", 
                gap: 1,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                padding: 2,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
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
                    disabled={loading}
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "primary.main"
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "primary.main",
                                borderWidth: "2px"
                            }
                        },
                        "&:hover": {
                            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)"
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={sendMessage}
                    disabled={loading or not currentMessage.trim()}
                    sx={{
                        minWidth: "64px",
                        height: "auto",
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                            transform: "scale(1.1) rotate(5deg)",
                            boxShadow: "0 8px 20px rgba(99, 102, 241, 0.6)"
                        },
                        "&:active": {
                            transform: "scale(0.95)",
                            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)"
                        },
                        "&:disabled": {
                            background: "rgba(99, 102, 241, 0.5)",
                            transform: "none"
                        }
                    }}
                >
                    <Send />
                </Button>
            </Box>
        </Fade>
    </Container>;
}

def app() -> any {
    return <ThemeProvider theme={theme}>
        <Box sx={{
            minHeight: "100vh",
            width: "100vw",
            margin: 0,
            padding: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            position: "fixed",
            top: 0,
            left: 0,
            overflowY: "auto",
            py: 4
        }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Chat />} />
                </Routes>
            </Router>
        </Box>
    </ThemeProvider>;
}