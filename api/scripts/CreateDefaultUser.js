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
        readLine.question('Password: ', async (answer) => {
            let password = answer.toString();
            readLine.close();

            if (!username || !password || !email) {
                console.log("Please enter all the fields");
                process.exit(1);
            }

            if (!username.match(/^\w{3,16}$/)) {
                console.log("Username must be between 3 and 16 characters");
                process.exit(1);
            }

            // verify email with regex
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?(?:\.[a-zA-Z\d](?:[a-zA-Z\d-]{0,61}[a-zA-Z\d])?)*$/.test(email)) {
                console.log("Email is not valid");
                process.exit(1);
            }


            // check if username is taken
            let user = await Users.findOne({
                username: {
                    $regex: new RegExp(username, 'i')
                }
            });

            if (user && user.username.toLowerCase() === username.toLowerCase()) {
                console.log("Username is already taken");
                process.exit(1);
            }

            // check if email is taken
            user = await Users.findOne({
                email: {
                    $regex: new RegExp(email, 'i')
                }
            });

            if (user) {
                console.log("Email is already taken");
                process.exit(1);
            }

            // verify password size
            if (password.length < 8) {
                console.log("Password must be at least 8 characters");
                process.exit(1);
            }

            Users.create({
                username: username,
                email: email,
                password: cryptoJS.SHA256(password).toString(),
                permissions: ["admin"]
            }, (err, user) => {
                if (err) {
                    console.log(err);
                    process.exit(1);
                } else {
                    console.log(`User ${user.username} created!`);
                    process.exit(0);
                }
            });
        });
    });
});