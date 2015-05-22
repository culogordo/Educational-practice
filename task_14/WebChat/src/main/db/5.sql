SELECT users.name, COUNT(messages.id) AS NumOfMessages FROM
(messages INNER JOIN users ON messages.author_id = users.id)
GROUP BY name HAVING COUNT(messages.id) > 3;