const functions = require('firebase-functions');
const app = require('express')();

const auth = require('./util/auth');

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
    getUserDetail,
    updateUserDetails,
    loginUser,
    signUpUser,
    uploadProfilePhoto
} = require('./APIs/users')


// todos
app.get('/todos', auth, getAllTodos);
app.post('/todo', auth, postOneTodo);
app.delete('/todo/:todoId', auth, deleteTodo);
app.put('/todo/:todoId', editTodo);

//transactionss
app.get('/transactions', auth, getAllTransactions);
app.post('/transaction', auth, postOneTransaction);
app.delete('/transaction/:transactionId', auth, deleteTransaction);
app.put('/transaction/:transactionId', auth, editTransaction);


//users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);