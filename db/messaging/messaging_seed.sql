
-- CREATE TABLE d_conversation (
--   conversation_id SERIAL PRIMARY KEY,
--   conversation_name VARCHAR(250)
-- )

-- INSERT INTO d_conversation (conversation_name)
-- VALUES (
--   'first message'
-- )

-- CREATE TABLE d_conversation_members (
--   conversation_id INTEGER,
--   FOREIGN KEY(conversation_id) REFERENCES d_conversation(conversation_id),
--   user_id INTEGER,
--   FOREIGN KEY(user_id) REFERENCES d_user(user_id)
-- )

-- create table d_user_messages (
--   user_id INTEGER,
--   FOREIGN KEY(user_id) REFERENCES d_user(user_id),
--   conversation_id INTEGER,
--   FOREIGN KEY(conversation_id) REFERENCES d_conversation(conversation_id),
--   to_user INTEGER,
--   FOREIGN KEY(to_user) REFERENCES d_user(user_id)
-- )

-- phasing this table out
-- INSERT INTO d_conversation_members (conversation_id,user_id)
-- VALUES (
--   1,
--   12
-- )

-- CREATE TABLE d_message (
--   message_id SERIAL PRIMARY KEY,
--   conversation_id INTEGER,
--   FOREIGN KEY(conversation_id) REFERENCES d_conversation(conversation_id),
--   content text,
--   date_created timestamp DEFAULT CURRENT_TIMESTAMP,
--   user_id INTEGER,
--   FOREIGN KEY(user_id) REFERENCES d_user(user_id)
-- )

-- INSERT INTO d_message (conversation_id,content,user_id)
-- VALUES (
--   1,
--   'this is the ver first message send on the MadModels messagin platform',
--   12
-- )

-- this should get all user conversations by name
select conversation_name, conversation_id 
from d_conversation dc
where conversation_id in ( select conversation_id from d_conversation_members where user_id = 12)
-- then use code below to get messages from individual conversations
select * from d_message where conversation_id 