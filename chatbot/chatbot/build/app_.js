function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { __jacJsx, __jacSpawn } from "@jac-client/utils";
import { useState } from "react";
function app() {
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    inputText = _useState2[0],
    setInputText = _useState2[1];
  var _useState3 = useState(null),
    _useState4 = _slicedToArray(_useState3, 2),
    resultObj = _useState4[0],
    setResultObj = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  function handleSend() {
    return _handleSend.apply(this, arguments);
  }
  function _handleSend() {
    _handleSend = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var result, out, r;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!loading) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            if (inputText.trim()) {
              _context.n = 2;
              break;
            }
            return _context.a(2);
          case 2:
            setLoading(true);
            _context.p = 3;
            _context.n = 4;
            return jac.run("chat_bot.reply", {
              "message": inputText
            });
          case 4:
            result = _context.v;
            out = null;
            if (result && result.reports && result.reports.length > 0) {
              r = result.reports[0];
              if (r && r.reply) {
                out = r;
              } else if (Array.isArray(r) && r.length > 0 && r[0] && r[0].reply) {
                out = r[0];
              } else {
                out = {
                  "reply": "" + r,
                  "original": inputText
                };
              }
            } else {
              out = {
                "reply": "",
                "original": inputText
              };
            }
            setResultObj(out);
          case 5:
            _context.p = 5;
            setLoading(false);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[3,, 5, 6]]);
    }));
    return _handleSend.apply(this, arguments);
  }
  return __jacJsx("div", {
    "style": {
      "maxWidth": "760px",
      "margin": "24px auto",
      "padding": "20px"
    }
  }, [__jacJsx("h1", {
    "style": {
      "marginBottom": "6px"
    }
  }, ["AI Chatbot"]), __jacJsx("div", {
    "style": {
      "color": "#555",
      "marginBottom": "14px"
    }
  }, ["Type a message and get an instant AI reply"]), __jacJsx("div", {
    "style": {
      "marginBottom": "10px"
    }
  }, [__jacJsx("textarea", {
    "value": inputText,
    "onChange": function onChange(e) {
      setInputText(e.target.value);
    },
    "onKeyPress": function onKeyPress(e) {
      if (e.key === "Enter" && e.shiftKey === false && !loading) {
        e.preventDefault();
        handleSend();
      }
    },
    "rows": 6,
    "placeholder": "Ask anything...",
    "style": {
      "width": "100%",
      "padding": "12px",
      "border": "1px solid #ddd",
      "borderRadius": "8px",
      "fontFamily": "inherit",
      "resize": "vertical",
      "boxSizing": "border-box"
    }
  }, [])]), __jacJsx("div", {}, [__jacJsx("button", {
    "onClick": handleSend,
    "disabled": loading || !inputText.trim(),
    "style": {
      "padding": "10px 16px",
      "border": "none",
      "borderRadius": "8px",
      "cursor": loading || !inputText.trim() ? "not-allowed" : "pointer",
      "background": loading || !inputText.trim() ? "#9ca3af" : "#3b82f6",
      "color": "#fff",
      "fontWeight": "600"
    }
  }, [loading ? "\u23F3 Sending\u2026" : "\u2728 Send"])]), loading ? __jacJsx("div", {
    "style": {
      "marginTop": "16px",
      "color": "#666"
    }
  }, ["Thinking…"]) : resultObj ? __jacJsx("div", {
    "style": {
      "marginTop": "18px"
    }
  }, [__jacJsx("div", {
    "style": {
      "padding": "14px",
      "background": "#f9fafb",
      "border": "1px solid #e5e7eb",
      "borderRadius": "8px",
      "whiteSpace": "pre-wrap",
      "marginBottom": "10px"
    }
  }, [__jacJsx("strong", {}, ["Assistant:"]), __jacJsx("br", {}, []), resultObj.reply]), __jacJsx("div", {
    "style": {
      "padding": "10px",
      "borderLeft": "3px solid #e5e7eb",
      "color": "#555",
      "whiteSpace": "pre-wrap"
    }
  }, [__jacJsx("strong", {}, ["Original:"]), " ", resultObj.original])]) : null]);
}
export { app };