const multer = require("multer");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        // console.log(req, file)
        cb(null, "./static/")
    },
    filename: (req, file, cb) => {
        //overide filename để tránh trường hợp cùng 1 thời điểm có 2 hoặc nhiều files cùng tên được upload lên 
        console.log(file);
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${prefix}-${file.originalname}`)
    }

}
)
const upload =  multer({storage});
module.exports = upload;