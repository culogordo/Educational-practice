SELECT message FROM messages WHERE author_id = (SELECT id FROM users WHERE name = 'Valera') AND message LIKE '%hello%';