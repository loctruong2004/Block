const NewRoute = require('./new');
const SiteRoute = require('./site');
const CourseRoute = require('./course');
const MeRoute = require('./me');
function route(app) {
    app.use('/new', NewRoute);
    app.use('/course', CourseRoute);
    app.use('/', SiteRoute);
    app.use('/me', MeRoute);
}

module.exports = route;
