var main = function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', {
        title: 'Login',
        message: req.flash('loginMessage')
    });
};
module.exports.main = main;