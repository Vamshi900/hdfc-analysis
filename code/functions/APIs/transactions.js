//transactions.js
const { db } = require('../util/admin');

//get all transactions
exports.getAllTransactions = (request, response) => {
    db
        .collection('transactions')
        .orderBy('date', 'desc')
        .get()
        .then((data) => {
            let transactions = [];
            data.forEach((doc) => {
                transactions.push({
                    transactionId: doc.id,
                    date: doc.data().date,
                    transaction: doc.data().transaction,
                    amount: doc.data().amount,
                    type: doc.data().type,
                });
            });
            return response.json(transactions);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

// add one transaction
exports.postOneTransaction = (request, response) => {
    if (request.body.date.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if (request.body.transaction.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    const newTransaction = {
        date: request.body.date,
        transaction: request.body.transaction,
        amount: request.body.amount,
        type: request.body.type,
        // createdAt: new Date().toISOString() // bug need to fix to use ISO time stamp string
    }
    db
        .collection('transactions')
        .add(newTransaction)
        .then((doc) => {
            const responseTodoItem = newTransaction;
            responseTodoItem.id = doc.id;
            return response.json(responseTodoItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong' });
            console.error(err);
        });
};


//delete single transaction
exports.deleteTransaction = (request, response) => {
    const document = db.doc(`/transactions/${request.params.transactionId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Transaction not found' })
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

// edit singel transaction
exports.editTransaction = ( request, response ) => { 
    if(request.body.transactionId){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('transactions').doc(`${request.params.transactionId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated Transaction successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};