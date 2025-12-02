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
import { Button, TextField, Paper, Box, Typography, Container, CircularProgress, Chip } from "@mui/material";
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
  function sendMessage() {
    return _sendMessage.apply(this, arguments);
  }
  function _sendMessage() {
    _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var user_msg, formatted_history, _iterator, _step, msg, userMessageObj, result, reply_text, r, botMessageObj;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
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
              _iterator = _createForOfIteratorHelper(chatHistory);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  msg = _step.value;
                  if (msg.sender === "user") {
                    formatted_history += "User: " + msg.text + "\\n";
                  } else {
                    formatted_history += "Bot: " + msg.text + "\\n";
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
            console.log("formatted_history:", formatted_history);
            userMessageObj = {
              "text": user_msg,
              "sender": "user",
              "timestamp": Date.now()
            };
            setChatHistory(function (prev) {
              return prev.concat([userMessageObj]);
            });
            setCurrentMessage("");
            setLoading(true);
            _context.p = 3;
            _context.n = 4;
            return __jacSpawn("chat_agent", "", {
              "userinput": user_msg,
              "formatted_history": formatted_history
            });
          case 4:
            result = _context.v;
            console.log("LLM result:", result);
            reply_text = "";
            if (result && result.reports && result.reports.length > 0) {
              r = result.reports[0];
              if (Array.isArray(r) && r.length > 0) {
                reply_text = "" + r[0];
              } else if (r) {
                reply_text = "" + r;
              }
            }
            botMessageObj = {
              "text": reply_text,
              "sender": "bot",
              "timestamp": Date.now()
            };
            setChatHistory(function (prev) {
              return prev.concat([botMessageObj]);
            });
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[3,, 5, 6]]);
    }));
    return _sendMessage.apply(this, arguments);
  }
  var chatContent = null;
  if (chatHistory.length === 0) {
    chatContent = __jacJsx(Typography, {
      "variant": "body2",
      "color": "text.secondary",
      "sx": {
        textAlign: "center",
        py: 5
      }
    }, ["Chat history will appear here..."]);
  } else {
    chatContent = __jacJsx(Box, {
      "sx": {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, [chatHistory.map(function (msg) {
      var alignment = "flex-start";
      var bgColor = "grey.200";
      var textColor = "text.primary";
      if (msg.sender === "user") {
        alignment = "flex-end";
        bgColor = "primary.main";
        textColor = "white";
      }
      return __jacJsx(Box, {
        "key": msg.timestamp,
        "sx": {
          display: "flex",
          justifyContent: alignment
        }
      }, [__jacJsx(Box, {
        "sx": {
          maxWidth: "70%",
          padding: 1.5,
          borderRadius: 2,
          backgroundColor: bgColor,
          color: textColor
        }
      }, [__jacJsx(Typography, {}, [msg.text])])]);
    })]);
  }
  return __jacJsx(Container, {
    "maxWidth": "md",
    "sx": {
      py: 3
    }
  }, [__jacJsx(Typography, {
    "variant": "h4",
    "component": "h1",
    "gutterBottom": true
  }, ["AI Chatbot"]), __jacJsx(Typography, {
    "variant": "body2",
    "color": "text.secondary",
    "sx": {
      mb: 2
    }
  }, ["Ask me anything..."]), __jacJsx(Paper, {
    "elevation": 3,
    "sx": {
      height: "400px",
      overflowY: "auto",
      p: 2,
      mb: 2,
      backgroundColor: "#f9fafb"
    }
  }, [chatContent]), __jacJsx(TextField, {
    "fullWidth": true,
    "multiline": true,
    "rows": 4,
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
    "sx": {
      mb: 2
    }
  }, []), __jacJsx(Button, {
    "variant": "contained",
    "color": "primary",
    "onClick": sendMessage,
    "disabled": loading || !currentMessage.trim(),
    "fullWidth": true,
    "size": "large"
  }, [loading ? "Sending\u2026" : "Send"])]);
}
function app() {
  return __jacJsx(Router, {}, [__jacJsx(Routes, {}, [__jacJsx(Route, {
    "path": "/",
    "element": __jacJsx(Chat, {}, [])
  }, [])])]);
}
export { Chat, app };