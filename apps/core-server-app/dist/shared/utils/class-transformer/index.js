"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sanitize = Sanitize;
const class_transformer_1 = require("class-transformer");
const sanitizeHtml = require("sanitize-html");
function Sanitize() {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string') {
            return sanitizeHtml(value, {
                allowedTags: [],
                allowedAttributes: {},
            }).trim();
        }
        if (value === null) {
            return value;
        }
    });
}
//# sourceMappingURL=index.js.map