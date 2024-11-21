import { Router } from "express";
import BookController from "../controllers/BookController.js";

const apiRouter = Router();
const bookControl = new BookController();

apiRouter.get('/books', bookControl.apiList); //lấy danh sách bản ghi
apiRouter.get('/books/:id', bookControl.apiDetail); //lấy chi tiết
apiRouter.delete('/books/:id', bookControl.apiDelete);

export default apiRouter;
