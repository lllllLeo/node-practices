# MySite on Node(Express)

## project manifest 파일(package.json) 생성

> `npm init -y` 
> 
## 설치패키지

> `npm i express`  
> `npm i express-session`  
> `npm i ejs`  
> `npm i dotenv`  
> `npm i sequelize`  => mysql2를 사용함  
> `npm i mysql2`  
> `npm i moment`  
> `npm i winston`  
> `npm i multer`  
> `npm i winston-daily-rotate-file`  
> `npm i -D nodemon`
> `npm i -D mocha`
> `npm i -D chai`

---

**winston**  
- 로그 파일을 관리해주는 모듈  
- 기본적으로 하루 단위로 새 로그 파일을 생성해주고, 로그 파일의 최대 크기와 최대 저장 파일 개수 등을 설정할 수 있습니다.


**sequelize**
- 쿼리를 작성하지 않고도 객체의 메서드를 활용하는 것처럼 쿼리 로직을 작성할 수 있다.  (ORM)
- Promise 기반으로 구현되었기 때문에 비동기 로직을 편리하게 작성 가능  
- 각기 다른 DB를 사용할 시 sequelize가 해당 DB에 맞게 변환해줌  

## scripts in package.json

```JSON
.
.
"scripts": {
    "start": "node index.js",
    "debug": "nodemon index.js",        // 비표준
    "test" : "npx mocha"                // 표준
},
.
.
```

## project structure

<pre>
/mysite
    | --- index.js
    | --- package.json
    | --- package-lock.json
    | --- /node-modules
    | --- /config
    | --- /logging
    | --- /logs
    | --- /multer-temporary-store
    | --- /public
            | --- /assets
                    | --- /gallery
    | --- /routes
    | --- /controllers
    | --- /models
    | --- /views
            | --- /main
            | --- /user
            | --- /guestbook
            | --- /board
            | --- /gallery
            | --- /admin
</pre>