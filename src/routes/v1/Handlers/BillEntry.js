import BillEntry from "../../../Modals/BillEntry.js";

export async function createBillEntryHandler(req, res) {
    try {
        const {
            services,
            engineer_name,
            bill_no,
            customer_name,
            phone_number,
            call_type,
            notes,
            date
        } = req.body || {};

        const billEntry = await BillEntry.create({
            services,
            engineer_name,
            bill_no,
            customer_name,
            phone_number,
            call_type,
            notes,
            date
        });

        res
            .status(200)
            .send({ status: 200, billEntry });
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}

export async function getBillEntryHandler(req, res) {
    const { order = '', bill_no, limit = 10, offset = 0, deleted = false } = req.query || {};

    const sort = {};
    const orders = order && order.split(',').forEach(i => {
        const [key, value] = i.split('_');
        sort[key] = value === "desc" ? -1 : 1
    });

    const filter = {};
    if (bill_no) filter.bill_no = bill_no;
    if (deleted !== false) filter.deleted = deleted;

    try {
        const list = await BillEntry.find(filter).sort(sort).limit(limit).skip(offset);
        res
            .status(200)
            .send({ status: 200, list });
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}

export async function updateBillEntryHandler(req, res) {
    const { bill_no: billNo } = req.params;
    console.log({ billNo }, "=============");

    if (isNaN(billNo)) {
        res
            .status(400)
            .send({ status: 400, message: "Check Network call" });

        return;
    }

    const {
        services,
        engineer_name,
        bill_no,
        customer_name,
        phone_number,
        call_type,
        notes,
        date,
        deleted
    } = req.body || {};

    try {
        const billEntry = await BillEntry.updateOne({ bill_no: billNo }, {
            services,
            engineer_name,
            bill_no,
            customer_name,
            phone_number,
            call_type,
            notes,
            date,
            deleted
        });

        res
            .status(200)
            .send({ status: 200, data: billEntry });
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}

export async function deleteBillEntryHandler(req, res) {
    const { bill_no } = req.params;

    try {
        const billEntry = await BillEntry.deleteOne({ bill_no });

        res
            .status(200)
            .send({ status: 200, data: billEntry });
    } catch (error) {
        res
            .status(500)
            .send({ status: 500, message: error.message, stack: error.stack });
    }
}