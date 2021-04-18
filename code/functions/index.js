const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo,
} = require('./APIs/todos')

const {
    getAllTransactions,
    postOneTransaction,
    deleteTransaction,
    editTransaction
} = require('./APIs/transactions')

// todos
app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

//transactions
app.get('/transactions', getAllTransactions);
app.post('/transaction', postOneTransaction);
app.delete('/transaction/:transactionId', deleteTransaction);
app.put('/transaction/:transactionId', editTransaction);

exports.api = functions.https.onRequest(app);