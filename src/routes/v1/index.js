import { Router } from "express";
import {
    loginHandler,
    profileHandler,
    // registerHandler,
} from "./Handlers/Auth.js";
import { createBillEntryHandler, deleteBillEntryHandler, getBillEntryHandler, updateBillEntryHandler } from "./Handlers/BillEntry.js";

export const getV1Routes = () => {
    const router = Router();

    router.get("/", (req, res) => {
        res.status(200).json({ text: "Hello!!! V1 requests" });
    });

    router.post("/login", loginHandler);
    // router.post("/register", registerHandler);
    router.post("/profile", profileHandler);
    
    router.post("/bill-entry", createBillEntryHandler);
    router.get("/bill-entry", getBillEntryHandler);
    router.patch("/bill-entry/:bill_no", updateBillEntryHandler);
    router.delete("/bill-entry/:bill_no", deleteBillEntryHandler);

    return router;
}