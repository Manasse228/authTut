

const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
                userInfo: userData
            },
            JWT_SIGN_SECRET,
            {
                expiresIn: '30d'
            })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUser: function(authorization) {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                const jwtToken = jwt.verify(token, process.env.JWT_SIGN_SECRET);
                if(jwtToken != null)
                    userId = jwtToken.userId;
            } catch(err) { }
        }
        return userId;
    }
};