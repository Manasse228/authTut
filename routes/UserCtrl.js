
const express = require('express')();
const cookieParser = require('cookie-parser');

const jwtToken = require('../utils/jwtUtils');
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*\d).{4,8}$/;


module.exports = {
    login:  async (req, res) => {

        // Params
        const email    = req.body.email;
        const password = req.body.password;

        if (email == null ||  password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        await checkCredentials(email, password).then(
            (result) => {

                if(result.id !== -1){
                    const token = jwtToken.generateTokenForUser(result.id);

                    res.cookie("unBankCookie", token, { maxAge: 900000, httpOnly: true });
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    res.send(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                    });
                }
            }

        );

    }
};

/*
app.get('/getcookie', function(req, res) {
    var username = req.cookies['username'];
    if (username) {
        return res.send(username);
    }

    return res.send('No cookie found');
});
 */


async function checkCredentials(login, password) {
    let _id = 1;


    return {
        id : _id
    };
}