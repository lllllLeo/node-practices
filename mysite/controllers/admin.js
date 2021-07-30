const fs = require('fs');
const path = require('path');
const models = require('../models')

module.exports = {
    index: async function(req, res, next){
        try {
            const result = await models.Site.findOne({
                attributes: ['title', 'welcome', 'profile', 'description']
            });
            res.render('admin/main',{
                site: result
            });
        } catch (error) {
             next(error);
        }
    },
    update: async function(req, res, next) {
        try {
            const file = req.file;
            let url = null;

            if(file) {
                const content = fs.readFileSync(file.path);

                const storeDirectory = path.join(
                    path.dirname(require.main.filename),        // ~/node-practices/mysite
                     process.env.STATIC_RESOURCES_DIRECTORY,    // /public 
                      process.env.UPLOADIMAGE_STORE_LOCATION);  // /assets/upload-images

                const storePath = 
                    path.join(storeDirectory, file.filename) +  // Y:\douzone\vscode-prejects\node-practices\mysite\public\assets\upload-images\69c7986f66f177c6bf3d60846606d276
                    path.extname(file.originalname);            // .PNG

                url = path.join(
                    process.env.UPLOADIMAGE_STORE_LOCATION, file.filename) + // \assets\upload-images\69c7986f66f177c6bf3d60846606d276
                    path.extname(file.originalname);                         // .PNG

                console.log(storeDirectory);                  // Y:\douzone\vscode-prejects\node-practices\mysite\public\assets\upload-images
                console.log(path.extname(file.originalname)); // .PNG
                console.log(file.originalname);               // IMG_3887.PNG
                console.log(storePath);                       // Y:\douzone\vscode-prejects\node-practices\mysite\public\assets\upload-images\69c7986f66f177c6bf3d60846606d276.PNG
                console.log(url);                             // \assets\upload-images\69c7986f66f177c6bf3d60846606d276.PNG

                fs.existsSync(storeDirectory) || fs.mkdirSync(storeDirectory);
                fs.writeFileSync(storePath, content, {flag: 'w+'}); 
                // w+ : Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
                // 읽기/쓰기로 열며  존재 하지 않으면 생성. 파일이 존재하면 내용을 지우고 처음부터 씀.
                fs.unlinkSync(file.path);
            }

            await models.Site.update(
                Object.assign({
                    title: req.body.title,
                    welcome: req.body.welcome,
                    description: req.body.description
                }, url? { profile: url.replace(/\\/gi, '/') } : null), {
                where: {}
                }
            )

            req.app.siteTitle = req.body.title;

            console.log(req.app.siteTitle);

            res.redirect('/admin')
        } catch (error) {
            next(error)
        }
    }
}