//khởi tạo node server
import express from "express"; //express dùng để khởi tạo node server
import ejs from "ejs"; //template engine để xây dựng giao diện
import mongoose from "mongoose"; //kết nối CSDL MongoDB
import router from "./routers/index.js";

const app = new express;
const port = 2000; //khai báo cổng sẽ chạy

app.use(
    express.urlencoded({
        extended: true
    })
);

//cấu hình template engine
app.set('engine', 'ejs');
app.set('views', './views'); //khai báo thư mục chứa file giao diện

// app.listen(port, () => {
//     //khai báo router: app.method('/url', (req,res) => {})
//     app.get('/list', (req,res) => {
//         //truyền dữ liệu qua query: ?query1=value1&query2=value2
//         //lấy dữ liệu từ query trên url
//         let name = req.query.name;
//         let email = req.query.email;
        
//         let array = [
//             { name: 'thaivm2', price: 1000000 },
//             { name: 'thaivm3', price: 3000000 },
//             { name: 'thaivm4', price: 4000000 },
//         ];

//         // res.send('<h1>Đây là trang danh sách</h1>');
//         res.render('list.ejs', {array});
//     });

//     //gửi dữ liệu qua params: '/url/:tenParam
//     app.get('/detail/:tenParam', (req,res) => {
//         console.log(req.params);
//         res.send('<p>Đây là trang chi tiết</p>')
//     });

//     // console.log('Server đang chạy ở cổng' + port);
//     console.log(`Server đang chạy ở cổng ${port}`);
// }) //chạy server

mongoose.connect('mongodb://localhost:27017/wd19202') //kết nối vs CSDL
    .then(result => { //nếu kết nối vs CSDL thành công
        app.use('/', router); //gọi vào router tổng (index.js)
        app.listen(port, () => {
            console.log(`Server đang chạy ở port ${port}`);
        })
    }).catch(error => {
        console.log(error);
    })
