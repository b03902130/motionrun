# [107-2] Web Programming Final Project
# (Group 10) �Ϧפj�@��

## Introduction
�����@�Ӥ��ӥX�����H�A�g�ӥi�H�b�a�B�ʪ��C���]�O�X���X�z���C
�ڭ̰��F�@���ɶ]�C���AĲ�o�A���]�̩��e�]������O�z�Lcamera�p��A�\�ʴT�רӧP�_�e�i���Z���A�䤤�ڭ̤]���ѵ��U�B�n���B�H�Ωb�]�ɶ��Ʀ�]���\��C

GitHub�G https://github.com/b03902130/web_final</br>
Demo�v���s���Ghttps://youtu.be/YT7gqlPrxHA</br>
Deploy�s���Ghttps://motionrun.herokuapp.com/</br>
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
#### ���U
�P�_��J�b���O�_�s�b��db���A�Y���s�b�h������U�b���A�Y�s�b�h�^�бb���w�s�b��alert�T���C
#### �n��
�P�_��J�b���O�_�s�b��db�B��J�K�X�O�_�k�X��Ƥ��A�Y���󤣹F���h�^�Ǥ��X�kalert�T���A�X�k�h��n���i��C���j�U�C
#### �}�ж��B�i�J�ж��B���ݹC���B�������}
�e��ݷ|���q�h�����ϥΪ̥ثe�����A�A���e��ݰw��ϥΪ̪��T���O���@�P�C
#### �C������
�z�Lcamera�P���v���A�Q��image processing���޳N����real time��motion detection�A�z�L�p���Ӯɶ��I�ǫ׭Ȥ��@�˪�pixel�ƶq�h�X�ʶ]�̫e�i���ܶ]�̩�F���I�C
#### �Ʀ�]
��ݷ|�����C�ӷ|�����̨ά����ðw��������ƦW�A���i�b�C���j�U���C
#### �[�K��Ʈw
���db�s������Ƴ��O�K��A�Y��server�Q���s�]�������forward secrecy�C

## Framework�BModule�BSource
gif source�Ghttps://giphy.com/explore/reaction-speed?fbclid=IwAR34JC9L-D4w8vUNOfUjptjcfLQn8CuWjB_woFaNkNHCYMxTc8aAotuA9zc </br>
web-camera�Ghttps://www.npmjs.com/package/react-webcam </br>
react-rebound�Ghttps://www.npmjs.com/package/react-rebound </br>
materialUI�Ghttps://material-ui.com/ </br>

## Tools�BDatabse
backend: axios, bcryptjs, jsonwebtoken, sequelize</br>
frontend: React, React-router, bootstrap, express</br>
db: PostgreSQL</br>
deployment: heroku</br>

## Specializations
���N���G�e�ݼv���B�z�B�ʵe�]�m�B��ѳB�z�Bdemo�v������C</br>
���Ѥ�G�e��ݾ���[�c�]�p�B�e�ݤ����]�p�B�e��ݳs���B�{���X���~�ե��C</br>
�J�����G��ݹB�@�]�p�B�e��ݳs���B��Ʈw�]�p�B�{���X���~�ե��C</br>
</br>

## Thoughts
���N���G</br>
�ۤv��ڤW�t�d������loading�����A�ܷP�¥t�~���j���j�O�ͷ�A�o���O�@�ӫܴr�֪��X�@�g��A��X�o�Q���ɭԴNı�o�@�w�n�Q�@�ӫܦn�����C���A���ӬO����]�p������B�ʨӹ����]�̪��e�i���A�����ê��js�x�}�B��䤣��python��numpy�������[�t�u��䴩�A�[�W���ѷ|�����T�v�����D�A�e���Q�O���άO�I�����z�Z�A�ҥH�N�ܦ�motion detection�F�A�Q�����ڤW���_�Ӳۮ��פj�T���ɡA�ڭ̦b�@���U�ժ����ɭԩ����]�L�������A�j�a�i�H�ժ��ݬݡA�O�Ҵ����p�B��I</br>

���Ѥ�G</br>
�o�� final �쥻�������Q���A���G�S�Q��b�̫�X�ѥX�{�F�@�ǷQ���S�Q�L�� bug�A���M���O tracable�A�]���i�H�Ѧ��u�����ڭ̪�O�F���֪��ɶ��b�B�z�C
�ܰ��������|��b�j�Ǯɴ����̫�i�H�J��X�@�r�֪��٦�]�C���ն����Q�p...�^�A�]�P�§ڪ��խ����ܦ��d���P�@�N����h�ơA�j�a�����ּ֡I


�J�����G</br>

�g�L�@�Ǵ����ҵ{�A�o�{�ۤv����ݩM��Ʈw�Ʀܺ����[�c�����컷���h�L��e�ݡA���}�ߦۤv�����|����Q�F�`���խ��H���A�@�N���ڦb final ���t�d��ݪ������C

�t�~�A�n���b���@�U�A�o���g���u���`�`��| GraphQL ���n�Τ��B�A�ѩ�ڭ̬O�ζǲ� restful api �M socket.io �ۤ��f�t���ΡA�X�{�F���h�p bug�A��b���I�o�H�A���n�̫�]���ѨM�F�C

�̫�Q���A�n�g��ݴN�o�n������[�c�H�ιB�@���@�w���A�Ѥ��M�u���|���ܺG��^^
</br>