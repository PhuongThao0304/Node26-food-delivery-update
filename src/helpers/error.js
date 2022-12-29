class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }

}
// new AppError (500, "")
// err: instance của AppError
const handleErrors = (err, req, res, next) => {
    console.log("error",err);
    // kiểm tra xem er có phải là instance của AppError hay không, nghĩa là err mình đã biết và xử lý
    if (!(err instanceof AppError)) {
         //nếu là những lỗi không phải là instance of AppError, thì có thể vì 1 lí do nào đó nó bị lỗi mà mình chưa biết dc
         err = new AppError(500, "Internal Server")
       
    } 
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        message: message
    });
    //nếu có các middleware phía sau, gọi next để đi tới các middleware phía sau
    next();


}
module.exports = {
    AppError,
    handleErrors,
}