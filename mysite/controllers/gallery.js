const models = require('../models');
const path = require('path');
const fs = require('fs');

module.exports = {
    index: async function(req, res, next) {
        try {
            const results = await models.Gallery.findAll({
                attributes: ['no', 'url', 'comment'],
                order: [
                    ['no', 'DESC']
                ]
            });
            res.render('gallery/index', {
                galleries: results
            });
        } catch (error) {
            next(error);
        }
    },
    upload: async function(req, res, next) {
        try {
            const file = req.file;
            console.log("upload temp : " + file.path);              // upload temp : Y:\douzone\vscode-prejects\node-practices\mysite\multer-temporary-store\7a1e26e3b20edfceb41949782694f479           파일을 여기에 업로드해서 

            const storeDirectory = path.join(
                path.dirname(require.main.filename),    // ~mysite
                process.env.STATIC_RESOURCES_DIRECTORY, // /public
                process.env.GALLERY_STORE_LOCATION);    // /assets/gallery
            console.log("storeDirectory : " + storeDirectory);      // storeDirectory : Y:\douzone\vscode-prejects\node-practices\mysite\public\assets\gallery                              

            const url = path.join(
                process.env.GALLERY_STORE_LOCATION,
                file.filename) + path.extname(file.originalname);
            
            console.log("url : " + url);                            // url : \assets\gallery\7a1e26e3b20edfceb41949782694f479.jpg

            const storePath = path.join(storeDirectory, file.filename) + path.extname(file.originalname)                                                
            console.log("storePath : " + storePath);                // storePath : Y:\douzone\vscode-prejects\node-practices\mysite\public\assets\gallery\7a1e26e3b20edfceb41949782694f479.jpg
            
            fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory); // 디렉토리가 만들어지고 확인이 되면 만들어질 수 있도록 Sync함
            
            const content = fs.readFileSync(file.path);
            fs.writeFileSync(storePath, content, {flag: 'w+'});

            // db
            await models.Gallery.create({
                url: url.replace(/\\/gi, '/'),                               // \를 /로 바꿔,
                comment: req.body.comment || ''
            });
            res.redirect('/gallery');
        } catch (error) {
            next(error);
        }

    },
    // ADMIN만 가능하게
    delete: async function(req, res, next){
        try {
            const no = req.params.no
            const result = await models.Gallery.destroy({
                where: {
                    no
                }
            });
            res.redirect('/gallery')
        } catch (error) {
            next(error)            
        }
    },
}