const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;
const multer = require('multer')
const path = require('path')
// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// buat server nya
/*
// create data / insert data
app.post('/api/movies', (req, res) => {
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO movies SET ?';

    // jalankan query
    koneksi.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Gagal insert data!', error: err });
        }

        // jika request berhasil
        res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    });
});
*/


// create data / insert data
app.post('/api/movies', upload.single('image'),(req, res) => {
    if (!req.file) {
    console.log("No file upload");
    } else {
    console.log(req.file.filename)
    var imgsrc = 'http://localhost:5000/images/' + req.file.filename
    // buat variabel penampung data dan query sql
    const data = { ...req.body };
    const querySql = 'INSERT INTO movies (judul,rating,deskripsi,foto) values (?,?,?,?);';
    const judul = req.body.judul;
    const rating = req.body.rating;
    const deskripsi = req.body.deskripsi;
    const foto = imgsrc;
    // jalankan query
    koneksi.query(querySql,[ judul,rating,deskripsi,foto], (err, rows, field) => {
    // error handling
    if (err) {
    return res.status(500).json({ message: 'Gagal insert data!', error: err });
    }
    // jika request berhasil
    res.status(201).json({ success: true, message: 'Berhasil insert data!' });
    });
    /* var insertData = "INSERT INTO users_file(file_src)VALUES(?)"
    db.query(insertData, [imgsrc], (err, result) => {
    if (err) throw err
    console.log("file uploaded")
    })*/
    }
    });

    app.use(express.static("./public"))
    //! Use of Multer
    var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
    callBack(null, './public/images/') // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
    callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
    })
    var upload = multer({
    storage: storage
    });

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
