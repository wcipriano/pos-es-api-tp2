-- Script de criação do bando de dados

--- DROP
-- DROP TABLE usuario; DROP TABLE categoria; DROP TABLE produto; DROP TABLE avaliacao;


BEGIN TRANSACTION;

-- CREATE TABLES

CREATE SEQUENCE usuario_id_seq;
CREATE TABLE
    usuario (
        id int NOT NULL DEFAULT nextval('usuario_id_seq'),
        nome varchar(200) NOT NULL,
        email varchar(100) NOT NULL,
        login varchar(100) NOT NULL,
        senha varchar(100) NOT NULL,
        roles varchar (200) NOT NULL DEFAULT 'USER',
        CONSTRAINT usuario_pk PRIMARY KEY (id)
    );


CREATE SEQUENCE categoria_id_seq;
 CREATE TABLE
    categoria (
        id int NOT NULL DEFAULT nextval('categoria_id_seq'),
        nome varchar(200) NOT NULL,
        descricao varchar(200) NOT NULL,
        CONSTRAINT categoria_pk PRIMARY KEY (id)
    );
CREATE UNIQUE INDEX categoria_id_idx ON categoria USING btree (id);



CREATE SEQUENCE produto_id_seq;
CREATE TABLE
    produto (
        id int4 NOT NULL DEFAULT nextval('produto_id_seq'),
        descricao varchar(200) NOT NULL,
        valor numeric NOT NULL DEFAULT 0,
        marca varchar(100) NULL,
        categoriaid int NOT NULL,
        CONSTRAINT produto_pk PRIMARY KEY (id),
        CONSTRAINT categoria_fk FOREIGN KEY (categoriaid) REFERENCES categoria(id)
    );
CREATE UNIQUE INDEX produto_id_idx ON public.produto USING btree (id);




CREATE SEQUENCE avaliacao_id_seq;
CREATE TABLE 
    avaliacao (
        id int NOT NULL DEFAULT nextval('avaliacao_id_seq'),
        usuarioid int NOT NULL,
        produtoid int NOT NULL,
        texto varchar(200) NOT NULL,
        curtidas int NOT NULL DEFAULT 0,
        CONSTRAINT avaliacao_pk PRIMARY KEY (id),
        CONSTRAINT usuario_fk FOREIGN KEY (usuarioid) REFERENCES usuario(id),
        CONSTRAINT produto_fk FOREIGN KEY (produtoid) REFERENCES produto(id)
    );
CREATE UNIQUE INDEX avaliacao_id_idx ON public.avaliacao USING btree (id);



-- INSERT DATA

INSERT INTO
    usuario (nome, login, senha, email, roles)
VALUES (
        'user',
        'user',
        '$2a$08$tprzZIs1OTKVMaVzZWrKfe8rX3toatWD6lsvp4u9AR54mrbSSLX7e',
        'user@abc.com.br',
        'USER'
    );

INSERT INTO
    usuario (nome, login, senha, email, roles)
VALUES (
        'admin',
        'admin',
        '$2a$08$tprzZIs1OTKVMaVzZWrKfe8rX3toatWD6lsvp4u9AR54mrbSSLX7e',
        'admini@abc.com.br',
        'USER;ADMIN'
    );



INSERT INTO
    categoria (
        nome,
        descricao
    )
VALUES ('Grãos','Grãos');

INSERT INTO
    categoria (
        nome,
        descricao
    )
VALUES ('Condimento','Misturas criadas indutrialmente.');

INSERT INTO
    categoria (
        nome,
        descricao
    )
VALUES ('Resfirados', 'Produtos a serem conservados em temperaturas frias.');

INSERT INTO
    categoria (
        nome,
        descricao
    )
VALUES ('Laticionios','Derivados do leite.');

INSERT INTO
    categoria (
        nome,
        descricao
    )
VALUES ('Industrializado','Produtos de frabicação humana.');




INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES (
        'Arroz parboilizado 5Kg',
        25,
        'Tio João',
        1
    );

INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES (
        'Maionese 250gr',
        7.2,
        'Helmanns',
        2
    );

INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES (
        'Iogurte Natural 200ml',
        2.5,
        'Itambé',
        3
    );

INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES ('Nescau 400gr', 8, 'Nestlé', 4);

INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES (
        'Batata Palha 180gr',
        5.20,
        'Chipps',
        5
    );

INSERT INTO
    produto (descricao, valor, marca, categoriaid)
VALUES ('Feijão Carioquinha', 5, 'Xap', 1);



INSERT INTO
    avaliacao (
        usuarioid,
        produtoid,
        texto,
        curtidas
    )
VALUES (1, 1, 'Muito bom o arroz', 10);

INSERT INTO
    avaliacao (
        usuarioid,
        produtoid,
        texto,
        curtidas
    )
VALUES (
        2,
        1,
        'Arroz estava com o saco furado',
        58
    );



COMMIT;

/*
 @TODO:
 Create UNIQUE Keys:
 public.usuario.email
 public.usuario.login
 
 */