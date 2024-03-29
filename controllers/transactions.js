
const Transaction = require('../models/Transaction');


// @desc get all transactions
// @route GET /api/v1/transactions
// @access public (no auth)

exports.getTransaction = async (req, res, next) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error!'
        })
    }
}

// @desc add transaction
// @route POST /api/v1/transactions
// @access public (no auth)

exports.addTransaction = async (req, res, next) => {

    try {

        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }


}


// @desc delete transaction
// @route DELETE /api/v1/transactions/:id
// @access public (no auth)

exports.deleteTransaction = async (req, res, next) => {


    try {
        const id = req.params.id;

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: "This id does not exist"
            })
        }

        else {
            await transaction.remove();
            return res.status(200).json({
                success: true,
                data: {}
            })
        }


    } catch (err) {
        res.status(500).json({
            success: false,
            error: 'Server Error!'
        })
    }

}