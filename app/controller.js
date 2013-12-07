exports.login = function (req, res) {
    
    if (req.body.username == null || req.body.username == '') {
        res.setHeader('WWW-Authenticate', 'realm="My realm"');
        res.render('login');
    } else {
        req.session.username = req.body.username;
        
        res.redirect('/main');
    }
};

exports.main = function (req, res) {
    
    res.send('Logged in as ' + req.session.username);
};