import { Router } from "express";
import { loginHandler, registerHandler } from "./Handlers/Auth.js";

export const getV1Routes = () => {
    const router = Router();
    
    router.get("/", (req, res) => {
        res.status(200).json({ text: "Hello!!! V1 requests" });
    });

    router.get("/login", loginHandler);
    // router.post("/register", registerHandler);

    return router;
}