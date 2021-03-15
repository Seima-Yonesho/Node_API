/*
*   hospitals
*/
insert into hospitals (id, name, phone, mail, password, address) values (1, '今西病院', '111-2222-3333', 'imanishihospital@mail.co.jp', 'password', '〒105-0011 東京都港区芝公園４丁目２−８');


/*
*   users
*/
ALTER TABLE users ADD name2 varchar(100);
ALTER TABLE users ADD phone varchar(30);
ALTER TABLE users ADD address text(100);
ALTER TABLE users CHANGE COLUMN mail email varchar(100);

insert into users (id, name1, name2, phone, mail, password, address) values (3, '山下', '達郎', '090-2749-7326', 'yamashita@gmail.com', 'taturo1919', '京都府京都市下京区東塩小路町７２１−１');

update users set id = 2 where name1 = '大滝';

delete from users where id = 2;