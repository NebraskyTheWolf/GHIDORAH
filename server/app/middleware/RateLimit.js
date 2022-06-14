const { RateLimiterMemory } = require('rate-limiter-flexible');
const opts = {
	points: 10,
	duration: 15,
};
const rateLimiter = new RateLimiterMemory(opts);

module.exports = function (req, res, next) {
    getHeaders(res);
    rateLimiter.consume(req.connection.remoteAddress, 2)
    .then(result => {
        next();
    })
    .catch(err => {
        res.status(429).json({
            status: false,
            code: 455320,
            message: 'Too Many Requests.'
        }).end();
    });

    next();
};

function getHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', [
        'https://skf-studios.com',
        'skf-studios.com',
        'dashboard.skf-studios.com'
    ]);
    res.setHeader('Access-Control-Allow-Methods', [
        'GET',
        'PUT',
        'POST',
        'DELETE'
    ]);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('x-powered-by', 'FoxProx v2.3.0');
    res.setHeader('Server', 'nuzzles your bulgy wulgy UwU');
}