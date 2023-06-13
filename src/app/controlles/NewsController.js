class NewsController {
    index(req, res) {
        res.render('news');
    }
    show(req, res) {
        res.send('data_News');
    }
}
module.exports = new NewsController();

// const newController = require('./Newscontroler');
