/*
*   hospitals
*/
insert into hospitals (id, name, phone, mail, password, address) values (1, '今西医院', '06-2456-9272', 'imanishihospital@mail.co.jp', 'hospital', '大阪府高槻市阿武野１丁目１−番１号');


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