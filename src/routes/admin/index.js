import { Router } from "express";

export const getAdminRoutes = () => {
    const router = Router();
    
    router.get("/", (req, res) => {
        res.status(200).json({ text: "Hello Admin!!!" });
    });

    return router;
}