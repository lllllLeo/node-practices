const { Suite } = require('mocha');
const {Sequelize, DataTypes} = require('sequelize');

module.exports = function(sequelize){
    const SiteModule = sequelize.define('Site', { 
        title: {
            field: 'title',
            type: DataTypes.STRING(45),
            allowNull: false
        },
        welcome: {
            field: 'welcome',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        profile: {
            field: 'profile',
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            field: 'description',
            type: DataTypes.STRING(200),
            allowNull: false
        },
    }, {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        tableName: 'site'
    });

    SiteModule.removeAttribute('id');
    return SiteModule;
};