UPDATE messages SET content = 'Conteúdo novo 2' WHERE id = 8;

UPDATE messages SET title = 'Título novo 1' WHERE id = 6
RETURNING *;

UPDATE messages 
SET 
    title = 'Título atualizado 1', 
    content = 'Conteúdo atualizado 1'
WHERE id = 2
RETURNING *;

UPDATE messages
SET
    (title, content) = ROW ('Título atualizado 2', 'Conteúdo atualizado 2')
WHERE id = 3
RETURNING *;