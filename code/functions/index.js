const functions = require('firebase-functions');
const app = require('express')();

//todo 
const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo,
} = require('./APIs/todos')

//transaction
const {
    getAllTransactions,
    postOneTransaction,
    deleteTransaction,
    editTransaction
} = require('./APIs/transactions')

//users
const {
    loginUser,
    signUpUser
} = require('./APIs/users')


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


//users
app.post('/login', loginUser);
app.post('/signup', signUpUser);

exports.api = functions.https.onRequest(app);