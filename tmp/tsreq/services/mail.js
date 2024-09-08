var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var nodemailer = require('nodemailer');
var TIME_INTERVAL = 15000;
var mailCache = [];
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'rollin.quigley56@ethereal.email',
        pass: '9Xc2QAkhJ7zkgtFbbY'
    }
});
var addMailToCache = function (mail) {
    mailCache.push(mail);
};
var clearMailCache = function () {
    mailCache = [];
};
var createHeader = function () { return ({
    from: 'do_not_reply@northpole.com',
    to: 'santa@northpole.com',
    subject: 'My Wishes!',
}); };
var createMessage = function () {
    var wishes = mailCache.map(function (mail) {
        return "\n      " + mail.username + "\n      " + mail.address + "\n      " + mail.wish + "\n      ";
    }).join('\n\n');
    clearMailCache();
    return "\n  Dear Santa,\n\n      We have received more wishes:\n\n      " + wishes + "\n      \n      Good luck.\n  ";
};
var sendMail = function () {
    if (mailCache.length === 0)
        return;
    try {
        var message = __assign(__assign({}, createHeader()), { text: createMessage() });
        transporter.sendMail(message);
    }
    catch (e) {
        console.log(e);
    }
};
var startMailTimer = function () {
    setInterval(function () {
        sendMail();
    }, TIME_INTERVAL);
};
module.exports = {
    addMailToCache: addMailToCache,
    startMailTimer: startMailTimer
};
