module.exports = function (fn) {
    if (!fn) {
        console.error("wrapAsync received undefined function!");
    }
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};
