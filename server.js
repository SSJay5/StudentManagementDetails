const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION Shutting Down......');
    console.log(err);
    process.exit(1);
});
// eslint-disable-next-line import/no-absolute-path
dotenv.config({ path: './config.env' });
const app = require('./app.js');
// eslint-disable-next-line no-unused-vars

//console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

// const DB=process.env.DATABASE;
// console.log(process.env);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection established');
    });
const port = 5000;
// eslint-disable-next-line import/no-absolute-path

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNNHANDELED REJECTION Shutting Down......');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});