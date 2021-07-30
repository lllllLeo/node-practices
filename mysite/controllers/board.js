const { Op, Sequelize } = require('sequelize');
const models = require('../models')
const moment = require('moment');
const Board = require('../models/Board');

module.exports = {
    list: async function(req, res, next){
        try {
            let page = req.query.pageNum;
            let totalCount = await models.Board.findAll({
                raw: true,
                attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('no')), 'totalCount']
                ],
            })
            totalCount = totalCount[0].totalCount;
            let countBoard= 10;										  							// 글 10개 뽑음
            let countPage = 5;										  							// 페이지 5개만 보이게
            let totalPage = Math.ceil(totalCount / countBoard); 							// 전체 페이지 개수
            let startCount = Number((page - 1)) * countBoard;  				  							// 쿼리 limit에서 사용할 startCount  
            let endCount = page * countBoard;   					  							// 쿼리 limit에서 사용할 endCount      ex) limit startCount, endCount
            let firstPageNo = parseInt((parseFloat((page / 10 + 0.9))) - 1) * countBoard + 1;		// 첫 페이지 번호
            let lastPageNo = totalPage;															// 마지막 페이지 번호
            let currentPageNo = page; 															// 현재 페이지
            if (lastPageNo > firstPageNo + 10 - 1) { 											// 마지막 페이지 번호를 설정해줌 
                lastPageNo = firstPageNo + 10 - 1;
            }

            console.log(`
            countBoard : ${countBoard}
            countPage  : ${countPage}
            totalPage  : ${totalPage}
            startCount : ${startCount}
            endCount   : ${endCount}
            firstPageNo: ${firstPageNo}
            lastPageNo : ${lastPageNo}
            currentPageNo : ${currentPageNo}`);    

            // attributes: [
            //     'no', 'title', 'depth', 'hit', 'regDate' 
            // ],
            const results = await models.Board.findAll({
                raw: true,
                include: {
                    model: models.User, 
                    required: true,
                    attributes: ['no', 'name']
                },
                order: [
                    ['groupNo', 'DESC'],
                    ['orderNo', 'ASC']
                ],
                offset: startCount,
                limit: countBoard
            });
            const pagination = { totalCount, totalPage, startCount, endCount, firstPageNo, lastPageNo, currentPageNo, countPage, countBoard, currentPageNo, page }
            
            res.render('board/list',{
                list: results,
                pagination,
                moment
            });
        } catch (error) {
            next(error)
        }
    },
    read: async function(req, res, next) {
        try {
            const no = req.params.no;
            const result = await models.Board.findOne({
                raw: true,
                where: {no}
            })
            const hitCount = await models.Board.findOne({
                raw:true,
                where: { no }
            })
            await models.Board.update({
                hit: hitCount.hit + 1 
                },{
                where: { no }
            })
            res.render('board/view', { board: result })
        } catch (error) {
            next(error);
        }
        
    },
    add: function(req, res, next){
        res.render('board/write');
    },
    _add: async function(req, res, next){
        try {
            // title, contents, reg_date, hit, group_no, order_no, depth, user_no
            const userNo = req.session.authUser.no;
            const maxGroupId = await models.Board.max('groupNo')
            console.log(maxGroupId + "   // maxGroupId");
            await models.Board.create({
                title: req.body.title,
                contents: req.body.contents,
                // reg_date
                hit: 0,
                groupNo: maxGroupId == null ? 0 : maxGroupId + 1,
                orderNo: 1,
                depth: 0,
                userNo
            })
            res.redirect('/board?pageNum=1')
        } catch (error) {
            next(error)
        }
        
    },
    reply: async function(req, res, next){
        try {
            const no = req.params.no
            const result = await models.Board.findOne({
                raw: true,
                where : { no }
            })
    
            res.render('board/reply',{
                board: result
            });
        } catch (error) {
            next(error);
        }
    },
    _reply: async function(req, res, next){
        try {
            const userNo = req.session.authUser.no;
            console.log(req.body.group_no);
            console.log(req.body.order_no);
            await models.Board.update({
                orderNo: Sequelize.literal('order_no + 1'),
                }, {where : {
                [Op.and]: [
                    { groupNo: req.body.group_no }, 
                    { orderNo: {[Op.gte]: req.body.order_no}}
                ]}
            });
            await models.Board.create({
                title: req.body.title,
                contents: req.body.contents,
                hit: 0,
                groupNo: req.body.group_no,
                orderNo: Number(req.body.order_no) + Number(1),
                depth: Number(req.body.depth) + Number(1),
                userNo
            });
            // res.redirect('/board/' + no);
            res.redirect('/board?pageNum=1');
        } catch (error) {
            next(error);
        }
    },
    modify: async function(req, res, next){
        const no = req.params.no;
        console.log(`modify get  ${no}`);
        const result = await models.Board.findOne({ where : { no } })
        res.render('board/modify', {
            board: result
        });
    },
    _modify: async function(req, res, next){
        try {
            
            const no = req.params.no
            const updateObject = Object.assign(req.body);
            await models.Board.update(
                updateObject, {
                    where : { no }
                })
                res.redirect('/board/' + no);
            } catch (error) {
                next(error);
            }
    },
    delete: async function(req, res, next){
        console.log("delete in");
        try {
            const no = req.params.no;
            await models.Board.destroy({ where: { no } })
            res.redirect('/board?pageNum=1');
        } catch (error) {
            next(error);
        }
    },
}