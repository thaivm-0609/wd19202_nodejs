import { Router } from "express";
import bookRouter from "./books.js";
import apiRouter from "./api.js";
import authRouter from "./auth.js";

const router = Router(); 

router.use('/', bookRouter); //router trả về giao diện ejs
router.use('/api', apiRouter); //router trả về api (dữ liệu dạng json)
router.use('/auth', authRouter); //router đăng ký/đăng nhập

export default router;
