const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize){
    return sequelize.define('Guestbook', { // 객체 정의
        no: {
            field: 'no',
            type: DataTypes.BIGINT(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        message: {
            field: 'message',
            type: DataTypes.TEXT,
            allowNull: false
        },
        regDate: {
            field: 'reg_date',
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW  
        },
    }, {
        underscored: true,
        freezeTableName: true, // 테이블 이름을 바꾸겠냐
        timestamps: true,
        createdAt: false,
        updatedAt: false, // 로우가 변경되었을때 updateAt 컬럼을 하겠냐
        tableName: 'guestbook'
    });
};