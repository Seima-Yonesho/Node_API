/*
*   hospitals
*/
insert into hospitals (id, name, phone, mail, password, address) values (1, '今西医院', '06-2456-9272', 'imanishihospital@mail.co.jp', 'hospital', '大阪府高槻市阿武野１丁目１−番１号');

ALTER TABLE hospitals ADD image varchar(50);

update hospitals set image = 'hospital2.jpg' where id = 2;


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

/*
*   reservations
*/
ALTER TABLE reservations CHANGE COLUMN peoples del_flg int default 0;
ALTER TABLE reservations CHANGE COLUMN id stamp timestamp;
ALTER TABLE reservations CHANGE COLUMN time time varchar(50);
ALTER TABLE reservations CHANGE COLUMN date date varchar(50);
ALTER TABLE reservations CHANGE COLUMN stamp stamp timestamp not null;
alter table reservations add stamp timestamp not null;
alter table reservations drop stamp;
