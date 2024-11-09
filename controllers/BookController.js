import Book from "../models/Book.js";

//khởi tạo class
class BookController {
    async getList(req,res) {
        //B1: lấy dữ liệu từ db ra
        const books = await Book.find();
        console.log(books);
        //B2: đổ ra giao diện
        res.render('list.ejs', {books});
    }
}

export default BookController;