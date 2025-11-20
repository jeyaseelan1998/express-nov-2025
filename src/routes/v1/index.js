import { Router } from "express";

export const getV1Routes = () => {
    const router = Router();
    
    router.get("/", (req, res) => {
        res.status(200).json({ text: "Hello!!!" });
    });

    return router;
}