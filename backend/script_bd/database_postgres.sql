--
-- Banco de dados: `database_postgres`
-- Estrtutura da tabela `tasks`
--

CREATE TABLE tasks (
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title character varying(255) NOT NULL,
    description character varying(255) NULL,
    completed boolean NOT NULL DEFAULT false
  );

ALTER TABLE tasks ADD CONSTRAINT tasks_pkey PRIMARY KEY (id)