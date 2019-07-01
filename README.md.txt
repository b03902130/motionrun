# [107-2] Web Programming Final Project
# (Group 10) 甩肉大作戰

## Introduction
身為一個不太出門的人，寫個可以在家運動的遊戲也是合情合理的。
我們做了一個賽跑遊戲，觸發你的跑者往前跑的機制是透過camera計算你擺動幅度來判斷前進的距離，其中我們也提供註冊、登錄、以及奔跑時間排行榜的功能。

GitHub： https://github.com/b03902130/web_final</br>
Demo影片連結：https://youtu.be/YT7gqlPrxHA</br>
Deploy連結：https://motionrun.herokuapp.com/</br>
## Local install
### Install `PostgreSQL`
#### Mac version
- install postgres (download link: https://postgresapp.com/, and follow the install steps)
> after install postgres database, use **terminal** to implement the following commands **(this is only based on Mac, Windows and Linux will be more complicated!)**

login to database
```
psql -h localhost
```
then it'll show something like this:
```
Type "help" for help.

ryanhu=# (you can type something here)
```
please type:
```
ryanhu=# \l
```
and you will see you default database name also username
- change **database name** and **username** as your own default value in **database/database.js** there is a chunk of code showed as below:(after download postgresql on Mac env, you will see it), and of course, saved it.
```javascript=
const sequelize = new Sequelize('<database name>', '<username>', null, {
  host: 'localhost',
  dialect: 'postgres'
  
  // some code here...
});
```

- create table: the code below is based on my env, so the username may be different from mine.
```
ryanhu=# create table users (id serial primary key, first_name text, last_name text, email text, password text, created text, score integer);
ryanhu=# create table rooms (id serial primary key, name text, active boolean, playerid integer ARRAY[3]);
```

#### Linux version
- update and install related packages
```shell
$ sudo apt-get update
$ sudo apt-get install postgresql postgresql-contrib
```
- Create a new **role** (postgresql jargon). The **role name** must be exactly same as your now logged in **linux account name**. In following steps we assume you are logged in as `linux_name`
```shell
$ sudo -u postgres createuser --interactive

***Output***
> Enter name of role to add: linux_name
> Shall the new role be a superuser? (y/n) y
```
- Create a new database. Again, **database name** must be exactly same as your **linux account name**
```shell
$ sudo -u postgres createdb linux_name
```
- enter psql (postgresql database console), add tables which are necessary for our web app, and set password
```shell
$ psql
> create table users (id serial primary key, first_name text, last_name text, email text, password text, created text, score integer);
> create table rooms (id serial primary key, name text, active boolean, playerid integer ARRAY[3]);
> alter user linux_name password 'new_password';
```

### (Optional) Test connection to `PostgreSQL`
In our web app, we use `sequelize` as ORM to manipulate `postgresql` database
```shell
$ mkdir test
$ cd test
$ npm init -y
$ npm install --save sequelize pg pg-hstore
$ vim test.js
```
Edit `test.js` as following
```javascript=
// test.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize('linux_name', 'linux_name', 'new_password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
```

You can run `node test.js` to check the connectivity of database

## Install package

- back-end
```
npm intall

npm run dev
```
- front-end
```
cd /client

npm install

npm start
```

## Function
#### 註冊
判斷輸入帳號是否存在於db中，若不存在則能夠註冊帳號，若存在則回覆帳號已存在的alert訊息。
#### 登錄
判斷輸入帳號是否存在於db且輸入密碼是否吻合資料比對，若條件不達成則回傳不合法alert訊息，合法則能登錄進到遊戲大廳。
#### 開房間、進入房間、等待遊戲、中場離開
前後端會溝通去紀錄使用者目前的狀態，讓前後端針對使用者的訊息保持一致。
#### 遊戲互動
透過camera感測影像，利用image processing的技術做到real time的motion detection，透過計算兩個時間點灰度值不一樣的pixel數量去驅動跑者前進直至跑者抵達終點。
#### 排行榜
後端會紀錄每個會員的最佳紀錄並針對紀錄做排名，公告在遊戲大廳當中。
#### 加密資料庫
後端db存取的資料都是密文，即使server被偷窺也能夠維持forward secrecy。

## Framework、Module、Source
gif source：https://giphy.com/explore/reaction-speed?fbclid=IwAR34JC9L-D4w8vUNOfUjptjcfLQn8CuWjB_woFaNkNHCYMxTc8aAotuA9zc </br>
web-camera：https://www.npmjs.com/package/react-webcam </br>
react-rebound：https://www.npmjs.com/package/react-rebound </br>
materialUI：https://material-ui.com/ </br>

## Tools、Databse
backend: axios, bcryptjs, jsonwebtoken, sequelize</br>
frontend: React, React-router, bootstrap, express</br>
db: PostgreSQL</br>
deployment: heroku</br>

## Specializations
李吉昌：前端影像處理、動畫設置、文書處理、demo影片拍攝。</br>
楊書文：前後端整體架構設計、前端介面設計、前後端連接、程式碼錯誤校正。</br>
胡均綸：後端運作設計、前後端連接、資料庫設計、程式碼錯誤校正。</br>
</br>

## Thoughts
李吉昌：</br>
自己實際上負責的部份loading較輕，很感謝另外兩位大神大力凱瑞，這次是一個很愉快的合作經驗，當出發想的時候就覺得一定要想一個很好笑的遊戲，本來是打算設計成手指運動來對應跑者的前進的，但後來礙於js矩陣運算找不到python有numpy類似的加速工具支援，加上辨識會有正確率的問題，容易被燈光或是背景給干擾，所以就變成motion detection了，想不到實際上玩起來羞恥度大幅提升，我們在咖啡廳試玩的時候店員跑過來關切，大家可以試玩看看，保證揮汗如雨喔！</br>

楊書文：</br>
這次 final 原本都滿順利的，結果沒想到在最後幾天出現了一些想都沒想過的 bug，雖然都是 tracable，也都可以解但真的讓我們花費了不少的時間在處理。
很高興有機會能在大學時期的最後可以遇到合作愉快的夥伴（每次組隊都被雷...），也感謝我的組員都很有責任感願意做更多事，大家暑假快樂！


胡均綸：</br>

經過一學期的課程，發現自己對於後端和資料庫甚至網路架構的興趣遠遠多過於前端，滿開心自己有機會能夠被厲害的組員信任，願意讓我在 final 中負責後端的部分。

另外，要來懺悔一下，這次寫完真的深深體會 GraphQL 的好用之處，由於我們是用傳統 restful api 和 socket.io 相互搭配應用，出現了滿多小 bug，實在有點惱人，幸好最後也都解決了。

最後想說，要寫後端就得要對網路架構以及運作有一定的瞭解不然真的會死很慘喔^^
</br>