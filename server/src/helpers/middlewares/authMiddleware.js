import Admin from '../../models/adminModal.js';
import jwt from 'jsonwebtoken';



//token dogrulama islemi, token cozerek kulanıcı bilgilerini alır, kulanıcıyı bulur 
const authenticateToken = async (req, res, next) => {

    try {
        // Token'i çerezlerden al
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            // Token'i çözümle
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            // Çözümlenen token'dan kullanıcı kimliğini al
             const admin = await Admin.findById(decodedToken.id);
             if (!admin) {
                 res.redirect("/")
                return res.status(401).json({
                    succeeded: false,
                    error: "Invalid token - user not found",

                });
            }

            //user bilgisini gecici sureligine degiskene at
            res.locals.admin = admin;

            //user gonder, giris yapan kulanıcı
            req.admin = admin;
            next();
        } else {
            res.redirect("/")

            return res.status(401).json({
                succeeded: false,
                error: "Token not provided",

            });
        }
    } catch (error) {
        res.locals.admin = null

        return res.status(401).json({
            succeeded: false,
            error: "Invalid token"
        });
    }
};


 

export {
    authenticateToken,
     
};