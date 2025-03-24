"use strict";
/**
 * Copyright 2025 Mida.so
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidaScript = void 0;
var react_1 = __importDefault(require("react"));
var script_1 = __importDefault(require("next/script"));
var MidaScript = function (_a) {
    var projectKey = _a.projectKey, _b = _a.useAntiFlicker, useAntiFlicker = _b === void 0 ? false : _b, _c = _a.antiFlickerTimeout, antiFlickerTimeout = _c === void 0 ? 3000 : _c, _d = _a.scriptAttributes, scriptAttributes = _d === void 0 ? {} : _d;
    try {
        if (!projectKey) {
            console.error('Mida: Project Key is required');
            return null;
        }
        var antiFlickerCode = "var timeout = ".concat(antiFlickerTimeout, "; !function(h,i,d,e){var t,n=h.createElement(\"style\");n.id=e,n.innerHTML=\"body{opacity:0}\",h.head.appendChild(n),t=d,i.rmfk=function(){var t=h.getElementById(e);t&&t.parentNode.removeChild(t)},setTimeout(i.rmfk,t)}(document,window,timeout,\"abhide\");");
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("link", { rel: "preconnect", href: "https://cdn.mida.so" }),
            useAntiFlicker && (react_1.default.createElement(script_1.default, { id: "mida-anti-flicker", strategy: "beforeInteractive", dangerouslySetInnerHTML: { __html: antiFlickerCode } })),
            react_1.default.createElement(script_1.default, __assign({ id: "mida-optimize", src: "https://cdn.mida.so/js/optimize.js?key=".concat(projectKey) }, scriptAttributes, { async: true }))));
    }
    catch (e) {
        console.error('Mida Script Error:', e);
        return null;
    }
};
exports.MidaScript = MidaScript;
