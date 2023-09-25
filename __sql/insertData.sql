INSERT INTO messages (title, content, createdAt) 
VALUES ('Título de exemplo 1', 'Conteúdo de exemplo 1', '2023-09-25');

INSERT INTO messages (title, content, createdAt) 
VALUES ('Título de exemplo 2', 'Conteúdo de exemplo 2', '2023-09-25'),
('Título de exemplo 3', 'Conteúdo de exemplo 3', '2023-09-25'),
('Título de exemplo 4', 'Conteúdo de exemplo 4', '2023-09-25');

INSERT INTO messages (title, content, createdAt) 
VALUES ('Título de exemplo 6', 'Conteúdo de exemplo 6', '2023-09-25')
RETURNING *;