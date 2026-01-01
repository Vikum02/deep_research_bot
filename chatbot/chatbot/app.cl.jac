import from react { useState, useRef, useEffect }
import from "@jac-client/utils" { Router, Routes, Route }
import from 'react-markdown' { default as ReactMarkdown }
import from 'remark-gfm' { default as remarkGfm }
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
    Slide,
    Divider
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
                }
            }
        }
        
        let input_to_send = user_msg;
        if (awaitingClarification) {
            input_to_send = originalQuestion + " - " + user_msg;
        }
        
        let userMessageObj = {
            "text": user_msg,
            "type": "user_message",
            "sender": "user",
            "timestamp": Date.now()
        };
        
        setChatHistory(lambda prev: any -> any { 
            return prev.concat([userMessageObj]); 
        });
        
        setCurrentMessage("");
        setLoading(true);

        let result = root spawn research_bot(
            userinput = input_to_send,
            formatted_history = formatted_history
        );

        # Extract response data as object
        let reply_data = None;
        if (result and result.reports and result.reports.length > 0) {
            reply_data = result.reports[0];
        }

        if (not reply_data) {
            reply_data = {
                "type": "error",
                "message": "I apologize, but I'm having trouble generating a response. Could you try rephrasing?"
            };
        }
 
        let botMessageObj = {
            "data": reply_data,
            "type": reply_data.type,
            "sender": "bot",
            "timestamp": Date.now()
        };
        
        setChatHistory(lambda prev: any -> any { 
            return prev.concat([botMessageObj]); 
        });

        # Detect clarification based on type
        let is_asking_clarification = (reply_data.type == "clarification");
        
        if (is_asking_clarification and not awaitingClarification) {
            setAwaitingClarification(true);
            setOriginalQuestion(user_msg);
        } elif (awaitingClarification) { 
            setAwaitingClarification(false);
            setOriginalQuestion("");
        }

        setLoading(false);
    }

    # Render user message
    def renderUserMessage(msg: any) -> any {
        return <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {msg.text}
        </Typography>;
    }

    # Render clarification questions
    def renderClarification(msg: any) -> any {
        let raw_text = msg.data.text;
        let lines = raw_text.split("\n");
        let questions_list = [];
        
        for line in lines {
            let line_stripped = line.trim();
            
            if line_stripped.indexOf("Q1:") == 0 {
                questions_list.push(line_stripped.replace("Q1:", "").trim());
            } elif line_stripped.indexOf("Q2:") == 0 {
                questions_list.push(line_stripped.replace("Q2:", "").trim());
            } elif line_stripped.indexOf("Q3:") == 0 {
                questions_list.push(line_stripped.replace("Q3:", "").trim());
            } elif line_stripped.indexOf("Q4:") == 0 {
                questions_list.push(line_stripped.replace("Q4:", "").trim());
            } elif line_stripped.indexOf("Q5:") == 0 {
                questions_list.push(line_stripped.replace("Q5:", "").trim());
            }
        }
        
        return <Box>
            <Typography sx={{ mb: 2, fontWeight: 600 }}>
                🔍 To provide the most relevant research, I need to understand better:
            </Typography>
            {questions_list.map(lambda q: any, idx: number -> any {
                return <Typography key={idx} sx={{ mb: 1.5, pl: 1 }}>
                    {idx + 1}. {q}
                </Typography>;
            })}
            <Typography sx={{ mt: 2, fontStyle: "italic" }}>
                📝 Please answer these questions so I can conduct targeted research for you?
            </Typography>
        </Box>;
    }

    # Render markdown research report - UPDATED TO USE REACT-MARKDOWN
    def renderMarkdownReport(msg: any) -> any {
        let markdown = msg.data.markdown;
        let topic = msg.data.topic;
        let search_count = msg.data.metadata.search_count;
        
        return <Box>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: "primary.main" }}>
                🔬 Deep Research Report
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 3, color: "text.secondary", fontStyle: "italic" }}>
                Topic: {topic}
            </Typography>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ 
                "& h1": { 
                    fontSize: "1.75rem", 
                    fontWeight: 700, 
                    mb: 2, 
                    mt: 3,
                    color: "primary.main"
                },
                "& h2": { 
                    fontSize: "1.4rem", 
                    fontWeight: 600, 
                    mb: 2, 
                    mt: 3,
                    color: "text.primary",
                    borderBottom: "2px solid #e5e7eb",
                    paddingBottom: 1
                },
                "& h3": { 
                    fontSize: "1.2rem", 
                    fontWeight: 600, 
                    mb: 1.5, 
                    mt: 2,
                    color: "text.primary"
                },
                "& p": { 
                    mb: 2, 
                    lineHeight: 1.8,
                    color: "text.primary"
                },
                "& ul, & ol": { 
                    mb: 2, 
                    pl: 3 
                },
                "& li": { 
                    mb: 1,
                    lineHeight: 1.7
                },
                "& strong": { 
                    fontWeight: 700,
                    color: "text.primary"
                },
                "& em": { 
                    fontStyle: "italic" 
                },
                "& code": {
                    backgroundColor: "#f1f5f9",
                    padding: "2px 6px",
                    borderRadius: 1,
                    fontSize: "0.9em",
                    fontFamily: "monospace"
                },
                "& pre": {
                    backgroundColor: "#f1f5f9",
                    padding: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    mb: 2
                },
                "& blockquote": {
                    borderLeft: "4px solid #6366f1",
                    paddingLeft: 2,
                    fontStyle: "italic",
                    color: "text.secondary",
                    mb: 2
                },
                "& table": {
                    width: "100%",
                    borderCollapse: "collapse",
                    mb: 2,
                    border: "1px solid #e5e7eb"
                },
                "& th": {
                    backgroundColor: "#f8fafc",
                    padding: 1.5,
                    textAlign: "left",
                    fontWeight: 600,
                    borderBottom: "2px solid #e5e7eb"
                },
                "& td": {
                    padding: 1.5,
                    borderBottom: "1px solid #e5e7eb"
                },
                "& hr": {
                    border: "none",
                    borderTop: "1px solid #e5e7eb",
                    my: 3
                }
            }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                </ReactMarkdown>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mt: 3, p: 2, bgcolor: "grey.100", borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    📚 Research Summary
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Total searches conducted: {search_count}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Deep research with multiple sources per topic
                </Typography>
                <Typography variant="body2">
                    • Personalized to your specific needs
                </Typography>
            </Box>
        </Box>;
    }

    # Render error message
    def renderError(msg: any) -> any {
        return <Typography sx={{ color: "error.main" }}>
            {msg.data.message}
        </Typography>;
    }

    # Main render function
    def renderMessage(msg: any) -> any {
        if (msg.sender == "user") {
            return renderUserMessage(msg);
        } elif (msg.type == "clarification") {
            return renderClarification(msg);
        } elif (msg.type == "research_report") {
            return renderMarkdownReport(msg);
        } elif (msg.type == "error") {
            return renderError(msg);
        } else {
            return <Typography>Unsupported message type</Typography>;
        }
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
                                {renderMessage(msg)}
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
                        Deep Research Bot
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