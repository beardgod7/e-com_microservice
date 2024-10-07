/*
import jwt, { JwtPayload } from 'jsonwebtoken';
import IUser from '../model/product/userinterface';

class TokenService {
  static generateAuthToken(user:IUser): string {
    const token = jwt.sign(
      { id: user.id, email: user.email},
      process.env.JWT_SECRET as string,  
      {
        expiresIn: '1d',
      }
    );
    return token;
  }

  static verifyAuthToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}




export default TokenService;
*/
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/Errorhandler';
export interface DecodedUser {
  id: number; 
}


export interface AuthRequest extends Request {
  user?: DecodedUser;
}

class Auth {
  isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return next(new ErrorHandler('No token provided', 403));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser ;
      (req as AuthRequest).user = decoded;
      next();
    } catch (err) {
      return next(new ErrorHandler('Invalid token', 401));
    }
  };
}

export default Auth