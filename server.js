//khởi tạo node server
import express from "express"; //express dùng để khởi tạo node server
import ejs from "ejs"; //template engine để xây dựng giao diện
import mongoose from "mongoose"; //kết nối CSDL MongoDB
import BookController from "./controllers/BookController.js";

const app = new express;
const port = 2000; //khai báo cổng sẽ chạy
const bookControl = new BookController; //khởi tạo object từ class BookController

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
        //khai báo router
        //app.method('/url', objectControl.tenFunction)
        app.get('/list', bookControl.getList); //hiển thị danh sách
        app.get('/detail/:book', bookControl.getDetail); //hiển thị chi tiết
        app.get('/delete/:book', bookControl.delete); //xóa bản ghi
        //thêm mới: 
        app.get('/create', bookControl.create);//trả về form cho ng dùng nhập dữ liệu
        app.post('/store', bookControl.store);//lấy dữ liệu, lưu vào database

        //chỉnh sửa
        app.get('/edit/:book', bookControl.edit); //hiển thị form sửa
        app.post('/update/:book', bookControl.update); //lưu dữ liệu mới vào db

        app.listen(port, () => {
            console.log(`Server đang chạy ở port ${port}`);
        })
    }).catch(error => {
        console.log(error);
    })
