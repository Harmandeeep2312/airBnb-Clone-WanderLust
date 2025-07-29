class ExpressError extends Error{
    constructor(status,messgae){
        super();
        this.status=status;
        this.message=this.message;
    }
}
module.exports = ExpressError;