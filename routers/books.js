import { Router } from "express";
import BookController from '../controllers/BookController.js';

const bookRouter = Router();
const bookControl = new BookController();
//khai báo router
//bookRouter.method('/url', objectControl.tenFunction)
bookRouter.get('/list', bookControl.getList); //hiển thị danh sách
bookRouter.get('/detail/:book', bookControl.getDetail); //hiển thị chi tiết
bookRouter.get('/delete/:book', bookControl.delete); //xóa bản ghi
//thêm mới: 
bookRouter.get('/create', bookControl.create);//trả về form cho ng dùng nhập dữ liệu
bookRouter.post('/store', bookControl.store);//lấy dữ liệu, lưu vào database
//chỉnh sửa
bookRouter.get('/edit/:book', bookControl.edit); //hiển thị form sửa
bookRouter.post('/update/:book', bookControl.update); //lưu dữ liệu mới vào db

export default bookRouter;