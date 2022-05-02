/*
    Script for create the default user (admin)
 */

const { Users } = require('../src/Models/index');
const cryptoJS = require('crypto-js');
const mongoose = require("mongoose");
const config = require("../src/config.json");
// Connect to MongoDB
mongoose.connect(config.mongodb.uri, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).catch(err => {
    console.error(err);
    process.exit(1);
});

const readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question('Username: ', (answer) => {
    let username = answer.toString();
    readLine.question('Email: ', (answer) => {
        let email = answer.toString();
        readLine.question('Password: ', (answer) => {
            let password = answer.toString();
            readLine.close();

            Users.create({
                username: username,
                email: email,
                password: cryptoJS.SHA256(password).toString(),
                perms: 'admin'
            }, (err, user) => {
                if (err) {
                    return console.log(err);
                } else {
                    return console.log(`User ${user.username} created`);
                }
            });
            process.exit(0);
        });
    });
});