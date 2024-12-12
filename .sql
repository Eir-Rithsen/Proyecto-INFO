-- Crea la tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  numero_legajo VARCHAR(20) NOT NULL UNIQUE
);

-- Crea la tabla de registros de notas
CREATE TABLE registros (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  archivo BYTEA,
  tipo_archivo VARCHAR(10)
);
