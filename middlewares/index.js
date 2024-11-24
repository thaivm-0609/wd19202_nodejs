import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkPermission = async (req,res,next) => {
    try {
        //B1: kiểm tra có token gửi lên hay không?
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) { //nếu ng dùng không gửi token lên
            return res.status(401).json({
                'message': 'Không có quyền'
            })
        }
        //B2: kiểm token có hợp lệ hay không: jwt.verify(token, 'secretKey')
        const data = jwt.verify(token, 'wd19202');
        if (!data) { //nếu verify token lỗi
            return res.status(401).json({
                'message': 'Không có quyền'
            })
        }
        //B3: kiểm tra data trong token có tồn tại ở trong db hay không?
        const user = await User.findById(data.id);
        if (!user) { //nếu không có user tương ứng vs id
            return res.status(401).json({
                'message': 'Không có quyền',
            })
        }
        next(); //chạy tiếp sang controller
    } catch (error) {
        res.status(401).json({
            'message': 'Lỗi'
        })
    }
}

export { checkPermission }