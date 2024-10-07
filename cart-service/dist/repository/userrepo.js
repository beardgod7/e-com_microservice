"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class repo {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(email) {
        const existingUser = await this.userModel.findOne();
    }
    async save(email, password, role, ProfileComplete, createdAt, updatedAt) {
        const newUser = new this.userModel({
            email,
            password,
            role: 'client',
            ProfileComplete: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newUser.save();
        return newUser;
    }
}
