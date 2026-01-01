function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { __jacJsx, __jacSpawn } from "@jac-client/utils";
import { useState, useRef, useEffect } from "react";
import { Router, Routes, Route } from "@jac-client/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, TextField, Paper, Box, Typography, Container, CircularProgress, Chip, Avatar, ThemeProvider, createTheme, Fade, Slide, Divider } from "@mui/material";
import { SmartToy, Send } from "@mui/icons-material";
var theme = createTheme({
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
      "default": "#f8fafc",
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
function Chat() {
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    currentMessage = _useState2[0],
    setCurrentMessage = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    chatHistory = _useState4[0],
    setChatHistory = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    awaitingClarification = _useState8[0],
    setAwaitingClarification = _useState8[1];
  var _useState9 = useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    originalQuestion = _useState0[0],
    setOriginalQuestion = _useState0[1];
  function sendMessage() {
    return _sendMessage.apply(this, arguments);
  }
  function _sendMessage() {
    _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var user_msg, formatted_history, _iterator2, _step2, msg, input_to_send, userMessageObj, result, reply_data, botMessageObj, is_asking_clarification;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (!loading) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (currentMessage.trim()) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            user_msg = currentMessage.trim();
            formatted_history = "";
            if (chatHistory.length > 0) {
              formatted_history = "Previous conversation:\\n";
              _iterator2 = _createForOfIteratorHelper(chatHistory);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  msg = _step2.value;
                  if (msg.sender === "user") {
                    formatted_history += "User: " + msg.text + "\\n";
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
            input_to_send = user_msg;
            if (awaitingClarification) {
              input_to_send = originalQuestion + " - " + user_msg;
            }
            userMessageObj = {
              "text": user_msg,
              "type": "user_message",
              "sender": "user",
              "timestamp": Date.now()
            };
            setChatHistory(function (prev) {
              return prev.concat([userMessageObj]);
            });
            setCurrentMessage("");
            setLoading(true);
            _context.n = 3;
            return __jacSpawn("research_bot", "", {
              "userinput": input_to_send,
              "formatted_history": formatted_history
            });
          case 3:
            result = _context.v;
            reply_data = null;
            if (result && result.reports && result.reports.length > 0) {
              reply_data = result.reports[0];
            }
            if (!reply_data) {
              reply_data = {
                "type": "error",
                "message": "I apologize, but I'm having trouble generating a response. Could you try rephrasing?"
              };
            }
            botMessageObj = {
              "data": reply_data,
              "type": reply_data.type,
              "sender": "bot",
              "timestamp": Date.now()
            };
            setChatHistory(function (prev) {
              return prev.concat([botMessageObj]);
            });
            is_asking_clarification = reply_data.type === "clarification";
            if (is_asking_clarification && !awaitingClarification) {
              setAwaitingClarification(true);
              setOriginalQuestion(user_msg);
            } else if (awaitingClarification) {
              setAwaitingClarification(false);
              setOriginalQuestion("");
            }
            setLoading(false);
          case 4:
            return _context.a(2);
        }
      }, _callee);
    }));
    return _sendMessage.apply(this, arguments);
  }
  function renderUserMessage(msg) {
    return __jacJsx(Typography, {
      "sx": {
        whiteSpace: "pre-wrap",
        wordBreak: "break-word"
      }
    }, [msg.text]);
  }
  function renderClarification(msg) {
    var raw_text = msg.data.text;
    var lines = raw_text.split("\\n");
    var questions_list = [];
    var _iterator = _createForOfIteratorHelper(lines),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        var line_stripped = line.trim();
        if (line_stripped.indexOf("Q1:") === 0) {
          questions_list.push(line_stripped.replace("Q1:", "").trim());
        } else if (line_stripped.indexOf("Q2:") === 0) {
          questions_list.push(line_stripped.replace("Q2:", "").trim());
        } else if (line_stripped.indexOf("Q3:") === 0) {
          questions_list.push(line_stripped.replace("Q3:", "").trim());
        } else if (line_stripped.indexOf("Q4:") === 0) {
          questions_list.push(line_stripped.replace("Q4:", "").trim());
        } else if (line_stripped.indexOf("Q5:") === 0) {
          questions_list.push(line_stripped.replace("Q5:", "").trim());
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return __jacJsx(Box, {}, [__jacJsx(Typography, {
      "sx": {
        mb: 2,
        fontWeight: 600
      }
    }, ["🔍 To provide the most relevant research, I need to understand better:"]), questions_list.map(function (q, idx) {
      return __jacJsx(Typography, {
        "key": idx,
        "sx": {
          mb: 1.5,
          pl: 1
        }
      }, [idx + 1, ". ", q]);
    }), __jacJsx(Typography, {
      "sx": {
        mt: 2,
        fontStyle: "italic"
      }
    }, ["📝 Please answer these questions so I can conduct targeted research for you?"])]);
  }
  function renderMarkdownReport(msg) {
    var markdown = msg.data.markdown;
    var topic = msg.data.topic;
    var search_count = msg.data.metadata.search_count;
    return __jacJsx(Box, {}, [__jacJsx(Typography, {
      "variant": "h5",
      "sx": {
        mb: 1,
        fontWeight: 700,
        color: "primary.main"
      }
    }, ["🔬 Deep Research Report"]), __jacJsx(Typography, {
      "variant": "subtitle2",
      "sx": {
        mb: 3,
        color: "text.secondary",
        fontStyle: "italic"
      }
    }, ["Topic: ", topic]), __jacJsx(Divider, {
      "sx": {
        mb: 3
      }
    }, []), __jacJsx(Box, {
      "sx": {
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
      }
    }, [__jacJsx(ReactMarkdown, {
      "remarkPlugins": [remarkGfm]
    }, [markdown])]), __jacJsx(Divider, {
      "sx": {
        my: 3
      }
    }, []), __jacJsx(Box, {
      "sx": {
        mt: 3,
        p: 2,
        bgcolor: "grey.100",
        borderRadius: 2
      }
    }, [__jacJsx(Typography, {
      "variant": "subtitle2",
      "sx": {
        fontWeight: 600,
        mb: 1
      }
    }, ["📚 Research Summary"]), __jacJsx(Typography, {
      "variant": "body2",
      "sx": {
        mb: 0.5
      }
    }, ["• Total searches conducted: ", search_count]), __jacJsx(Typography, {
      "variant": "body2",
      "sx": {
        mb: 0.5
      }
    }, ["• Deep research with multiple sources per topic"]), __jacJsx(Typography, {
      "variant": "body2"
    }, ["• Personalized to your specific needs"])])]);
  }
  function renderError(msg) {
    return __jacJsx(Typography, {
      "sx": {
        color: "error.main"
      }
    }, [msg.data.message]);
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
  var chatContent = null;
  if (chatHistory.length === 0) {
    chatContent = __jacJsx(Typography, {
      "variant": "body2",
      "sx": {
        textAlign: "center",
        py: 5,
        color: "#64748b",
        fontWeight: 500
      }
    }, ["Chat history will appear here..."]);
  } else {
    chatContent = __jacJsx(Box, {
      "sx": {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, [chatHistory.map(function (msg, index) {
      var alignment = "flex-start";
      var bgColor = "grey.200";
      var textColor = "text.primary";
      var slideDirection = "right";
      if (msg.sender === "user") {
        alignment = "flex-end";
        bgColor = "primary.main";
        textColor = "white";
        slideDirection = "left";
      }
      return __jacJsx(Slide, {
        "direction": slideDirection,
        "in": true,
        "timeout": 500,
        "key": msg.timestamp
      }, [__jacJsx(Box, {
        "sx": {
          display: "flex",
          justifyContent: alignment
        }
      }, [__jacJsx(Fade, {
        "in": true,
        "timeout": 800
      }, [__jacJsx(Box, {
        "sx": {
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
        }
      }, [renderMessage(msg)])])])]);
    })]);
  }
  return __jacJsx(Container, {
    "maxWidth": "md",
    "sx": {
      py: 3
    }
  }, [__jacJsx(Fade, {
    "in": true,
    "timeout": 1000
  }, [__jacJsx(Box, {
    "sx": {
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 3,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: 2,
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    }
  }, [__jacJsx(Avatar, {
    "sx": {
      bgcolor: "primary.main",
      width: 56,
      height: 56,
      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)"
    }
  }, [__jacJsx(SmartToy, {
    "sx": {
      fontSize: 32
    }
  }, [])]), __jacJsx(Box, {}, [__jacJsx(Typography, {
    "variant": "h4",
    "component": "h1",
    "sx": {
      fontWeight: 700,
      color: "primary.main",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }
  }, ["Deep Research Bot"]), __jacJsx(Typography, {
    "variant": "body2",
    "sx": {
      color: "#64748b",
      fontWeight: 500
    }
  }, ["Ask me anything..."])])])]), __jacJsx(Fade, {
    "in": true,
    "timeout": 1200
  }, [__jacJsx(Paper, {
    "elevation": 0,
    "sx": {
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
    }
  }, [__jacJsx(Box, {
    "sx": {
      position: "relative",
      zIndex: 1
    }
  }, [chatContent])])]), __jacJsx(Fade, {
    "in": true,
    "timeout": 1400
  }, [__jacJsx(Box, {
    "sx": {
      display: "flex",
      gap: 1,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      padding: 2,
      borderRadius: 3,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
    }
  }, [__jacJsx(TextField, {
    "fullWidth": true,
    "multiline": true,
    "rows": 3,
    "value": currentMessage,
    "onChange": function onChange(e) {
      setCurrentMessage(e.target.value);
    },
    "onKeyPress": function onKeyPress(e) {
      if (e.key === "Enter" && e.shiftKey === false) {
        e.preventDefault();
        sendMessage();
      }
    },
    "placeholder": "Type your message here...",
    "variant": "outlined",
    "disabled": loading,
    "sx": {
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
    }
  }, []), __jacJsx(Button, {
    "variant": "contained",
    "color": "primary",
    "onClick": sendMessage,
    "disabled": loading || !currentMessage.trim(),
    "sx": {
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
    }
  }, [__jacJsx(Send, {}, [])])])])]);
}
function app() {
  return __jacJsx(ThemeProvider, {
    "theme": theme
  }, [__jacJsx(Box, {
    "sx": {
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
    }
  }, [__jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {
    "path": "/",
    "element": __jacJsx(Chat, {}, [])
  }, [])])])])]);
}
export { Chat, app };