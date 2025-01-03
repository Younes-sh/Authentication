import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/mongoose'; // اتصال به MongoDB
import User from '@/models/user'; // مدل User شما

export default async function handler(req, res) {
  await dbConnect(); // اتصال به دیتابیس

  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1]; // گرفتن توکن از هدر Authorization
    // console.log("Headers:", req.headers); // برای دیدن هدرهای درخواست

    if (!token) {
      console.error('Token is missing');
      return res.status(401).json({ message: 'Access token is missing' });
    }

    try {
      // اعتبارسنجی توکن
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      // پیدا کردن کاربر با استفاده از userId از توکن
      const user = await User.findById(decoded.userId).select('-password'); // حذف فیلد پسوورد از خروجی

      if (!user) {
        console.error('User not found');
        return res.status(404).json({ message: 'User not found' });
      }

      // ارسال اطلاعات کاربر به پاسخ
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in /api/user:', error.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
