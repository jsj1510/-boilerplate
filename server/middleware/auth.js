const { User } = require('../models/User');
let auth = (req, res, next) => {
    // 이곳에서 인증처리를 하는 곳 
    // 클라이언트 쿠키에서 토큰을 가져온다 ==> 쿠키 파서를 이용한다. 
    let token = req.cookies.x_auth;
    // 토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        //if no user, No auth
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true });
    
        //if user exist, ok auth
        req.token = token;
        req.user = user;
        next();
      });
};
    // 유저가 있으면 인증 오케이 
    // 유저가 없으면 인증 노노 


module.exports = { auth };