import bcrypt from 'bcrypt';
import MongoDB from '@/utils/mongoose';
import User from '@/models/user';

export default async function handler(req, res) {
    MongoDB();
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    } else {
        const { firstname, lastname, username, email, password, city, state, zip } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ firstname, lastname, username, email, password: hashedPassword, city, state, zip });
            return res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
