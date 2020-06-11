module.exports = function (req, res, next) {
    res.locals.frontLogedUser = false;
    if (req.session.logedUser != undefined) {
        res.locals.frontLogedUser = req.session.logedUser;
        //console.log(res.locals.frontLogedUser);
    }else if(req.cookies.logedUser){
        //si esta la cookie con el usuario se lo pasamos a la sesion a la vista
        req.session.userLog = req.cookies.loggedUser;
        res.locals.userLog =  req.cookies.loggedUser;
    }
    next();
};
//este midleware asigna el usuario a locals  y se pone a disposicion de todas las rutas en el app.js