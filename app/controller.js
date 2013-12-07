exports.login = function (req, res) {
    
    if (req.body.username == null) {
        res.setHeader('WWW-Authenticate', 'realm="My realm"');
        res.send(401, { error: 'Bad credentials.' });
    } else {
        req.session.username = req.body.username;
        
        res.redirect('main');
    }
};