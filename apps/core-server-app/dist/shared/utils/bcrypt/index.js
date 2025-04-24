"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
//# sourceMappingURL=index.js.map