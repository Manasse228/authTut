

const express      = require('express');
const usersCtrl    = require('./routes/UserCtrl');


// Router
exports.router = (function() {
    const apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/login/').post(usersCtrl.login);

    return apiRouter;
})();