var config = {
    'port': process.env.port || 8081,
    'database':'mongodb://127.0.0.1:27017/ecs',                    // database connection link
    'superSecret':'itsasecret'                                              // key for generating for customer api token
};
module.exports = config;