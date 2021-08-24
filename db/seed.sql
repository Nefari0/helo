-- HELO USERS --
-- CREATE TABLE helo_users (
--     id SERIAL PRIMARY KEY,
--     user_name VARCHAR(20) NOT NULL,
--     password VARCHAR(250) NOT NULL,
--     profile_pic TEXT
--   );
-- insert into helo_users (user_name,password,profile_pic)
-- values ('myname','pass','pictext')
------------

-- HELO POSTS --

-- DROP TABLE helo_posts

-- CREATE TABLE helo_posts (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(45) NOT NULL,
--   content TEXT,
--   img TEXT,
--   author_id INTEGER,
--   FOREIGN KEY(id) REFERENCES helo_users(id),
--   date_created timestamp DEFAULT CURRENT_TIMESTAMP
-- );

-- INSERT INTO helo_posts (title,content,img,author_id)
-- VALUES ('post title','this is the post text','image_urd',6)
-- ------------------------------------------------------

-- SELECT *
-- FROM helo_posts hp
-- JOIN helo_users hu ON hu.id = hp.author_id