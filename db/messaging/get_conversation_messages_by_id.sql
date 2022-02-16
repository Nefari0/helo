SELECT * from d_message dm 
join d_user du on dm.user_id = du.user_id
where dm.conversation_id = $1
ORDER BY date_created ASC