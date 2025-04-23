import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized. Login again' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Not authorized. Login again' });
    }
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

export default userAuth;
