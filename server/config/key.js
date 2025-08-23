if(process.env.NOD_ENV === 'production'){
    module.exports = require("./production.js");
} else {
    module.exports = require("./dev.js");
}