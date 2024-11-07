//khởi tạo node server
import express from "express"; //express dùng để khởi tạo node server
const app = new express;
const port = 2000; //khai báo cổng sẽ chạy
app.use(
    express.urlencoded({
        extended: true
    })
);
app.listen(port, () => {
    //khai báo router: app.method('/url', (req,res) => {})
    app.get('/list', (req,res) => {
        res.send('<h1>Đây là trang danh sách</h1>')
    });
    app.get('/detail', (req,res) => {
        res.send('<p>Đây là trang chi tiết</p>')
    });

    // console.log('Server đang chạy ở cổng' + port);
    console.log(`Server đang chạy ở cổng ${port}`);
}) //chạy server
