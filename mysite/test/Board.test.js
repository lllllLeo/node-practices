const dotenv = require('dotenv');
const path = require('path');
const should = require('chai').should();

dotenv.config({path: path.join(path.resolve(__dirname, '..'), 'config/db.env')});

describe('Model Board', function(){
    let models = null;
    let user = null;
    before(async function(){
        models = require('../models')
        user = await models.User.create({
            name: 'testUser',
            email: 'testUser@mysite.com',
            password: '1',
            gender: 'male'
        })
    });

    it('Create 3 Boards', async function(){
        let board; // undefined    = null 하면 아 자바개발자구나 
        
        board = await models.Board.create({
            title: 'test title',
            contents: 'test contents',
            hit: 0,
            userNo: user.no
        });
        board.no.should.not.equals(undefined)

        board = await models.Board.create({
            title: 'test title',
            contents: 'test contents',
            hit: 0,
            userNo: user.no
        });
        board.no.should.not.equals(undefined)

        board = await models.Board.create({
            title: 'test title',
            contents: 'test contents',
            hit: 0,
            userNo: user.no
        });
        board.no.should.not.equals(undefined)


    });

    it("Fetch Boards by user(test)", async function(){
        const results = await models.Board.findAll({
            where: {
                userNo: user.no
            },
            include: {
                model: models.User, 
                // default는 false라서 LEFT JOIN / true => INNER JOIN
                required: true // 원래 outter join인데 required: true하면 inner join으로 바뀜
            }

        });

        results.should.have.lengthOf(3);
    }) 

    after(async function(){
        await models.Board.destroy({
            where: {
                userNo: user.no
            }
        });
        await models.User.destroy({
            where: {
                no: user.no
            }
        });
    });
})

