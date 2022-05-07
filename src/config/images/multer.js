const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(__dirname);
        cb(null,__dirname+ '/public/uploads/');

    }
    , filename: (req, file, cb) => {
        console.log(path.extname(file.originalname));
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
        return cb(null, true);
                
    } else {
        cb('Error: Archivo no válido');
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1500000
    },
    fileFilter: fileFilter
})

module.exports = upload;