SELECT * FROM d_user_messages dum
join d_conversation dc on dc.conversation_id = dum.conversation_id
join d_user du on dum.to_user = du.user_id
where dum.user_id = $1