"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repository/user.repository");
const user_strategy_1 = require("./strategy/user.strategy");
let UserService = class UserService {
    userRepository;
    createNewUserStrategy;
    existingUserStrategy;
    constructor(userRepository, createNewUserStrategy, existingUserStrategy) {
        this.userRepository = userRepository;
        this.createNewUserStrategy = createNewUserStrategy;
        this.existingUserStrategy = existingUserStrategy;
    }
    async createUser(userDTO) {
        const existingUser = await this.userRepository.findUserByEmail(userDTO);
        if (existingUser) {
            return this.existingUserStrategy.handleExistingUser();
        }
        return this.createNewUserStrategy.createUser(userDTO);
    }
    async getAllUsers() {
        return this.userRepository.getAllUsers();
    }
    async deleteUserById(id) {
        return this.userRepository.deleteUserById(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        user_strategy_1.CreateNewUserStrategy,
        user_strategy_1.ExistingUserStrategy])
], UserService);
//# sourceMappingURL=users.service.js.map