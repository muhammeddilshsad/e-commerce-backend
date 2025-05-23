import jwt from "jsonwebtoken"


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decodeededrdf",decoded);
      
      req.user = decoded
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  protect(req, res, () => {
   
      if (req.user && req.user.role==="admin") {
          return next();
      } else {
          return next(new CustomError('You are not authorized', 403));
      }
  });
};



