SELECT title, content FROM messages;

SELECT * FROM messages;

SELECT * FROM messages WHERE id = 1;

SELECT * FROM messages WHERE title LIKE 'Título%';

SELECT * FROM messages WHERE title LIKE '%2';

SELECT * FROM messages WHERE title LIKE '%novo%';

SELECT * FROM messages WHERE title ILIKE 'títULO%';

/*
LIKE - é case sensitive - maiúsculo e minúsculo fazem diferença
ILIKE - NÃO é case sensitive - maiúsculo ou minúsculo não imporat
% - estabelece se é possível ter algo antecedendo ou procendo o termo
*/
