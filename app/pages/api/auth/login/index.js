import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '@/utils/mongoose'; // اطمینان از اتصال به MongoDB
import User from '@/models/user';

export default async function handler(req, res) {
    // اتصال به MongoDB
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // بررسی معتبر بودن ورودی‌ها
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // ایجاد توکن JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
