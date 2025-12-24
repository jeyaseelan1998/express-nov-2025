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
    const { order = '', bill_no } = req.query || {};

    const sort = {};
    const orders = order && order.split(',').forEach(i => {
        const [key, value] = i.split('_');
        sort[key] = value === "desc" ? -1 : 1
    });

    const filter = {};
    if (bill_no) {
        filter.bill_no = bill_no;
    }

    try {
        const list = await BillEntry.find(filter).sort(sort);
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

    try {
        const billEntry = await BillEntry.updateOne({ bill_no }, {
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