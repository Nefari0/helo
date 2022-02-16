SELECT * FROM d_user_messages dum
WHERE dum.user_id = $1 AND dum.to_user = $2