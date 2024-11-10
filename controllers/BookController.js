import Book from "../models/Book.js";

//khởi tạo class
class BookController {
    async getList(req,res) {
        //B1: lấy dữ liệu từ db ra
        const books = await Book.find();
        //B2: đổ ra giao diện
        res.render('list.ejs', {books});
    }

    async getDetail(req,res) {
        //B1: lấy id bản ghi cần xem chi tiết
        const id = req.params.book;
        //B2: truyền id để truy vấn dữ liệu từ db
        const book = await Book.findById(id);
        //B3: đổ dữ liệu ra giao diện
        res.render('detail.ejs', { book });
    }

    async delete(req,res) {
        //B1: lấy id bản ghi cần xóa
        const id = req.params.book;
        //B2: truyền id lên để xóa 
        await Book.findByIdAndDelete(id);
        //B3: đưa ng dùng về trang danh sách
        res.redirect('/list');
    }

    create(req,res) {
        res.render('create.ejs');
    }

    async store(req,res) {
        //B1: lấy dữ liệu ng dùng nhập vào form
        const data = { //req.body.inputName
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            image: req.body.image,
        }
        //B2: đẩy dữ liệu lưu vào db
        await Book.create(data);
        //B3: đưa ng dùng về trang danh sách 
        res.redirect('/list');
    }
}

export default BookController;