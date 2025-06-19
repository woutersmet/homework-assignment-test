"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to extract client ID from Authorization header
function extractClientId(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({ error: 'Authorization header missing' });
    }
    // For this example, assume the client ID is sent directly as the value
    req.clientId = authHeader;
    next();
}
app.get('/foo', extractClientId, (req, res) => {
    res.json({
        message: 'Hello World from /foo',
        clientId: req.clientId,
    });
});
app.get('/bar', extractClientId, (req, res) => {
    res.json({
        message: 'Hello World from /bar',
        clientId: req.clientId,
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
