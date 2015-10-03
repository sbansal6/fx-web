var main = function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', {
        title: 'Signup',
        message: req.flash('signupMessage')
    });
};
module.exports.main = main;