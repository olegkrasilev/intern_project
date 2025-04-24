"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareUserDTO = prepareUserDTO;
const bcrypt_1 = require("../../shared/utils/bcrypt");
async function prepareUserDTO(userDTO) {
    const userDTOClone = structuredClone(userDTO);
    userDTOClone.passwordHash = await (0, bcrypt_1.hashPassword)(userDTOClone.passwordHash);
    return userDTOClone;
}
//# sourceMappingURL=prepare.user.dto.js.map