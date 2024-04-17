"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processForm = exports.displayForm = void 0;
const displayForm = (req, res, next) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Node Server</title></head>");
    res.write("<body>");
    res.write("<h2>Message Form</h2>");
    res.write(`<form method="POST" action="/messages"><input type="text" name="message"><button>Submit</button></form>`);
    res.write("</body>");
    res.write("</html>");
    return res.end();
};
exports.displayForm = displayForm;
const processForm = (req, res, next) => {
    console.log(req.body);
    res.send(req.body);
};
exports.processForm = processForm;
