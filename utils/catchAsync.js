module.exports = function (fn) {
    if (!fn) {
        console.error("⚠ ERROR: wrapAsync received an undefined function!");
    }
    return function (req, res, next) {
        if (!fn) {
            return next(new Error("wrapAsync got undefined function"));
        }
        fn(req, res, next).catch(next);
    };
};