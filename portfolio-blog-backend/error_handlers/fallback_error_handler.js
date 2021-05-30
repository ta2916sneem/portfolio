"use strict";
exports.__esModule = true;
exports.errorHandler = exports.notFound = void 0;
var notFound = function (req, res, next) {
    var error = new Error("Not Found - " + req.originalUrl);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
var errorHandler = function (err, req, res, next) {
    var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
exports.errorHandler = errorHandler;
