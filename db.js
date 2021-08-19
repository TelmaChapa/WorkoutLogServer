const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log-project', 'postgres', 'Password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(function () {
    console.log('Connected to workout-log-project postgres database');
},
    function (err) {
        console.log(err);
    }
);
module.exports = sequelize;