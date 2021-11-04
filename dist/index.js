"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPort = exports.probe = void 0;
var net_1 = __importDefault(require("net"));
var SUCCESS_EVENTS = ["error"];
var FAILURE_EVENTS = ["connect", "timeout"];
/**
 * Probes a port, returns whether or not it is open.
 * @param port The port to probe.
 * @param timeout The amount of time to wait before timing out.
 * @returns Whether or not the port is open..
 */
var probe = function (port, timeout) {
    if (timeout === void 0) { timeout = 5000; }
    return new Promise(function (resolve) {
        var socket = net_1.default.createConnection({ port: port, timeout: timeout });
        var complete = function (success) {
            socket.end();
            socket.removeAllListeners();
            resolve(success);
        };
        SUCCESS_EVENTS.forEach(function (eventName) {
            return socket.once(eventName, function () { return complete(true); });
        });
        FAILURE_EVENTS.forEach(function (eventName) {
            return socket.once(eventName, function () { return complete(false); });
        });
    });
};
exports.probe = probe;
/**
 * Finds an port in a range of ports.
 * @param port The port to begin with.
 * @param options The options for the scan.
 * @param options.max The maximum port to scan.
 * @returns Resolves to the acquired port, if it exists, otherwise null.
 */
var findPort = function (startingPort, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, max, port, success;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = (options || {}).max, max = _a === void 0 ? startingPort + 1000 : _a;
                if (max <= startingPort)
                    throw Error("Maximum port cannot be less than or equal to starting port.");
                port = startingPort;
                _b.label = 1;
            case 1:
                if (!(port <= max)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.probe)(port)];
            case 2:
                success = _b.sent();
                if (success)
                    return [2 /*return*/, port];
                _b.label = 3;
            case 3:
                port++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, null];
        }
    });
}); };
exports.findPort = findPort;
