import jwt from 'jsonwebtoken'

//gelen userId gore token olustueuyor, return ediyor
export const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '7d'});
}


