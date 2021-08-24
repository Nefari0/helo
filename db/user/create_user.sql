INSERT INTO helo_users (user_name,password,profile_pic)
VALUES ($1,$2,$3)
RETURNING *;