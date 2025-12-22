import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../../../Modals/User.js";
import Role from "../../../Modals/Role.js";
import { JWT_SECRET } from "../../../utils/config.js";

export async function registerHandler(req, res) {
    try {
        const { name, email, password, role } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser !== null) {
            res
                .status(400)
                .send({ status: 400, message: "User already exists!" });
        } else {
            if (!role) {
                res
                    .status(400)
                    .send({ status: 400, message: "Role field is required!" });
            } else {
                const roleDocument = await Role.findOne({
                    role,
                });
                
                const hash = await bcrypt.hash(password, 10);
                const userData = await User.create({
                    name,
                    email,
                    password: hash,
                    role: roleDocument?.id
                });
                res
                    .status(200)
                    .send({ status: 200, data: userData });
            }
        }
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}

export async function loginHandler(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .send({ status: 400, message: "Email / Password is required." });
        } else {
            const data = await User.findOne({ email });
            if (!data) {
                res
                    .status(401)
                    .send({ status: 401, message: "Email / Password is incorrect." });
            } else {
                const { password: hash } = data;
                const isPasswordCorrect = await bcrypt.compare(password, hash);
                if (isPasswordCorrect === false) {
                    res
                        .status(401)
                        .send({ status: 401, message: "Password is incorrect." });
                } else {
                    const jwtToken = jwt.sign({ email }, JWT_SECRET);
                    res
                        .status(200)
                        .cookie(
                            "token",
                            jwtToken,
                            {
                                secure: true,
                                expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
                            }
                        )
                        .send({ success: true });
                }
            }
        }
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}