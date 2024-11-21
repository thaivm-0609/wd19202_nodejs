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

    async edit(req,res) {
        //B1: lấy id bản ghi cần sửa
        const id = req.params.book;
        //B2: truy vấn dữ liệu theo id
        const book = await Book.findById(id);
        //B3: đổ dữ liệu ra giao diện
        res.render('edit.ejs', {book});
    }

    async update(req,res) {
        //B1: lấy id bản ghi cần sửa
        const id = req.params.book;
        //B2: lấy dữ liệu người dùng nhập vào form
        const data = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            image: req.body.image,
        }
        //B3: gửi dữ liệu lưu vào db
        await Book.findByIdAndUpdate(id,data);
        //B4: đưa ng dùng về trang list
        res.redirect('/list');
    }

    //API function
    async apiList(req,res) {
        try {
            //truy vấn dữ liệu từ mongoDb
            const books = await Book.find();
            //trả dữ liệu
            res.status(200).json({
                'message': 'Lấy dữ liệu thành công',
                'data': books,
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Lỗi'
            })
        }
    }

    async apiDetail(req,res) {
        try {
            //B1: lấy id bản ghi
            const id = req.params.id;
            //B2: truy vấn dữ liệu theo id
            const book = await Book.findById(id);
            //B3: trả dữ liệu về
            res.status(200).json({
                'message': 'Thành công',
                'data': book,
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Lỗi'
            })
        }
    }

    async apiDelete(req,res) {
        try {
            //B1: lấy id bản ghi cần xóa
            const id = req.params.id;
            //B2: gửi id truy vấn
            const deletedBook = await Book.findByIdAndDelete(id);
            //B3: trả dữ liệu về
            res.status(200).json({
                'message': 'Xóa thành công',
                'data': deletedBook,
            })
        } catch (error) {
            res.status(400).json({
                'message': 'Lỗi'
            })
        }
    }
}

export default BookController;