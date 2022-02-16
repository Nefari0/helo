SELECT * FROM d_user_admin_message duam
JOIN d_user d ON duam.user_id = d.user_id  WHERE d.user_id = $1
ORDER BY date_created ASC;