const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Thêm fs để kiểm tra và tạo thư mục

// Đảm bảo thư mục uploads/ tồn tại
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Tạo thư mục nếu chưa có
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Đảm bảo sử dụng đúng thư mục
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tên file duy nhất
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Chấp nhận file ảnh
    } else {
        cb(new Error('Only image files are allowed!'), false); // Chỉ cho phép ảnh
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;
