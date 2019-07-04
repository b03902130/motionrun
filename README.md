# [107-2] Web Programming Final Project

# (Group 10) 甩肉大作戰
身為一個不太出門的人，寫個可以在家運動的遊戲也是合情合理的。
我們做了一個賽跑遊戲，觸發你的跑者往前跑的機制是透過camera計算你擺動幅度來判斷前進的距離，其中我們也提供註冊、登錄、以及奔跑時間排行榜的功能。
- GitHub： https://github.com/b03902130/motionrun
- Demo影片連結：https://youtu.be/YT7gqlPrxHA
- Deploy連結：https://motionrun.herokuapp.com/

&nbsp;

# Local environment setup
## 1. Install `PostgreSQL`
Postgresql use your **operating system account name** as your default accessible role (postgresql jargon) and database name. That is, if you login your system with the name **os_account**, you also need to use **os_account** as role name and database name. In the following steps we assume we logged in as **os_account**.

### Mac version
---
download (https://postgresapp.com/) and follow the installation steps, it will automatically create a role and a database  both named after **os_account**.

&nbsp;

### Linux version

---

- update and install related packages
```shell
$ sudo apt-get update
$ sudo apt-get install postgresql postgresql-contrib
```
- Create a new role. The role name must be exactly same as your now logged in **operating system account name**, assuming `os_account`
```shell
$ sudo -u postgres createuser --interactive

***Output***
> Enter name of role to add: os_account
> Shall the new role be a superuser? (y/n) y
```
- Create a new database. Again, database name must be exactly same as your **operating system account name**, assuming `os_account`
```shell
$ sudo -u postgres createdb os_account

```

&nbsp;

## 2. Enter into database console and setup configurations

- Enter into postgresql database console
```
$ psql
```

- Inside database console, type folowing commands. `os_account` should be replaced with your **operating system account name** and `new_password` can be set as whatever you like.
```shell
$ create table users (id serial primary key, first_name text, last_name text, email text, password text, created text, score integer);
$ create table rooms (id serial primary key, name text, active boolean, playerid integer ARRAY[3]);
$ alter user os_account password 'new_password';
```

&nbsp;

## 3. Connect to database with `Sequelize`
In our web app, we use `sequelize` as ORM to manipulate `postgresql` database. The connection configuration is set in .env in project root directory.

### Modify code to accommodate with new database
- Create a new file `.env` and place it at root directory of this repository.
- Modify `.env` as following. Remember to replace `os_account`, `new_password` with proper value.
```javascript=
DATABASE_URL=postgres://os_account:new_password@localhost:5432/os_account
```
After this setting, `Sequelize` should be able to connect the database. You can test the connectivity by following steps.
1. Create a testing directory
```shell
$ mkdir test
$ cd test
$ npm init -y
$ npm install --save sequelize pg pg-hstore
$ vim test.js
```
2. Edit `test.js` as following. Again, remember to replace `os_account` and `new_password` with proper values
```javascript=
// test.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://os_account:new_password@localhost:5432/os_account', {
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
3. You can run `node test.js` to check the connectivity of database

&nbsp;

## 4. Install packages
- npm version should be higher then 6.9.0
```shell
$ npm install
```

## 5. Start development
- backend server
    - `npm run server-debug`: run backend server at `http://localhost:5000/`, and open a debug websocket channel at `localhost:5001`
- frontend webpack server
    - `npm start`: run react webpack server at `http://localhost:3000/`
- build for deployment
    - `npm run build`: will build frontend files and generate a `build/` folder at the root of repository. The backend server will automatically serve files in this `build/` folder (eg. index.html) when we open the web app with `http://localhost:5000/`
    - `npm run server`: run up the server at `http://localhost:5000`. When frontend files are built, only this backend server is needed (no need to run up webpack server at port 3000)

&nbsp;

# Functions
### 註冊
判斷輸入帳號是否存在於db中，若不存在則能夠註冊帳號，若存在則回覆帳號已存在的alert訊息。
### 登錄
判斷輸入帳號是否存在於db且輸入密碼是否吻合資料比對，若條件不達成則回傳不合法alert訊息，合法則能登錄進到遊戲大廳。
### 開房間、進入房間、等待遊戲、中場離開
前後端會溝通去紀錄使用者目前的狀態，讓前後端針對使用者的訊息保持一致。
### 遊戲互動
透過camera感測影像，利用image processing的技術做到real time的motion detection，透過計算兩個時間點灰度值不一樣的pixel數量去驅動跑者前進直至跑者抵達終點。
### 排行榜
後端會紀錄每個會員的最佳紀錄並針對紀錄做排名，公告在遊戲大廳當中。
### 加密資料庫
後端db存取的資料都是密文，即使server被偷窺也能夠維持forward secrecy。

&nbsp;

# Packages
- Backend: axios, bcryptjs, jsonwebtoken, sequelize, PostgreSQL, express, socket.io
- Frontend: axios, socket.io, React, React-route, bootstrap, react-rebound, web-camera, material-ui
- Deployment: heroku
- Gif source：https://giphy.com/explore/reaction-speed?fbclid=IwAR34JC9L-D4w8vUNOfUjptjcfLQn8CuWjB_woFaNkNHCYMxTc8aAotuA9zc

&nbsp;

# Contributions
This is a final organized repository. To see each one's commit history one can refer to another [dev repo](https://github.com/b03902130/web_final)
- **李吉昌：** 前端影像處理、動畫設置、文書處理、demo影片拍攝。
- **楊書文：** 前後端整體架構設計、前端介面設計、前後端連接、程式碼錯誤校正。
- **胡均綸：** 後端運作設計、前後端連接、資料庫設計、程式碼錯誤校正。

&nbsp;

# Thoughts
- **李吉昌：** 自己實際上負責的部份loading較輕，很感謝另外兩位大神大力凱瑞，這次是一個很愉快的合作經驗，當出發想的時候就覺得一定要想一個很好笑的遊戲，本來是打算設計成手指運動來對應跑者的前進的，但後來礙於js矩陣運算找不到python有numpy類似的加速工具支援，加上辨識會有正確率的問題，容易被燈光或是背景給干擾，所以就變成motion detection了，想不到實際上玩起來羞恥度大幅提升，我們在咖啡廳試玩的時候店員跑過來關切，大家可以試玩看看，保證揮汗如雨喔！

- **楊書文：** 這次 final 原本都滿順利的，結果沒想到在最後幾天出現了一些想都沒想過的 bug，雖然都是 tracable，也都可以解但真的讓我們花費了不少的時間在處理。
很高興有機會能在大學時期的最後可以遇到合作愉快的夥伴（每次組隊都被雷...），也感謝我的組員都很有責任感願意做更多事，大家暑假快樂！

- **胡均綸：** 經過一學期的課程，發現自己對於後端和資料庫甚至網路架構的興趣遠遠多過於前端，滿開心自己有機會能夠被厲害的組員信任，願意讓我在 final 中負責後端的部分。另外，要來懺悔一下，這次寫完真的深深體會 GraphQL 的好用之處，由於我們是用傳統 restful api 和 socket.io 相互搭配應用，出現了滿多小 bug，實在有點惱人，幸好最後也都解決了。最後想說，要寫後端就得要對網路架構以及運作有一定的瞭解不然真的會死很慘喔^^
