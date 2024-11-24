import { Router } from "express";
import BookController from "../controllers/BookController.js";
import { checkPermission } from "../middlewares/index.js";

const apiRouter = Router();
const bookControl = new BookController();

apiRouter.get('/books', bookControl.apiList); //lấy danh sách bản ghi
apiRouter.get('/books/:id', bookControl.apiDetail); //lấy chi tiết
apiRouter.delete('/books/:id', checkPermission, bookControl.apiDelete);
apiRouter.post('/books', checkPermission, bookControl.apiCreate);
apiRouter.put('/books/:id', checkPermission, bookControl.apiUpdate); 

export default apiRouter;
