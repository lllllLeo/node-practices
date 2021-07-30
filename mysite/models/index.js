const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
    }
);

const User = require('./User')(sequelize)
const Guestbook = require('./Guestbook')(sequelize)
const Gallery = require('./Gallery')(sequelize)
const Site = require('./Site')(sequelize)
const Board = require('./Board')(sequelize)

User.hasMany(Board, {
    as: 'user',
    foreignKey: {
        name: 'userNo',
        allowNull: false,
        constraints: true,
        onDelete: 'CASCADE'
    }
});
Board.belongsTo(User);

User.sync({
    // force: false,  
    force: process.env.TABLE_CREATE_ALWAYS === 'true', // env 값이 string 이라서                 / // true: drop 시키고 create   / false: 달라진게 있을때 sync
    alter: process.env.TABLE_ALTER_SYNC === 'true' // true: User 내용이 변경이 되면 alter table ~쿼리가 실행됨  개발중이면 true ㄱ(테이블 변경될 가능성이 많으니까)
});
Guestbook.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', 
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});
Gallery.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', 
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});
Site.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', 
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});
Board.sync({
    force: process.env.TABLE_CREATE_ALWAYS === 'true', 
    alter: process.env.TABLE_ALTER_SYNC === 'true'
});

module.exports = { User, Guestbook, Gallery, Site, Board } // 딴데서도 쓰려면 다 넣어주기 sync