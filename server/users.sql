-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    roles character varying(5) COLLATE pg_catalog."default" NOT NULL,
    keys character varying(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (keys),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_roles_check CHECK (roles::text = ANY (ARRAY['Admin'::character varying, 'User'::character varying]::text[])),
    CONSTRAINT users_keys_check CHECK (keys::text ~ '^[0-9]{1,8}$'::text)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;