--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS project_test;
--
-- Name: project_test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE project_test WITH TEMPLATE = template0 ENCODING = 'UTF8';
--  LOCALE_PROVIDER = libc LOCALE = 'French_France.1252';


ALTER DATABASE project_test OWNER TO postgres;

\connect project_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    firstname character varying NOT NULL,
    lastname character varying NOT NULL,
    image_link character varying,
    email character varying NOT NULL,
    password character varying NOT NULL,
    age integer,
    role character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('test', 'hash', NULL, 'wins@wins.fr', '$argon2id$v=19$m=65536,t=3,p=4$18pzJvTFzAHsFLU6Y10Gvw$JrSA1O4nKblIYpRKdcRczh26NBruMvU+NYas6dkkumE', 33, 'admin', 2);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('test', 'hash', NULL, 'wins@winss.fr', '$argon2id$v=19$m=65536,t=3,p=4$ggbtUAvp9KX9GjiSgtLLUA$EtNKv2IKlcPbKwzDOc6as91pO+h3s2Jh5CJUDEgYIIE', 33, 'employee', 3);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Four', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@four.fr', '$argon2id$v=19$m=65536,t=3,p=4$DEAoGY5OsfNxe48S3xCbXg$ET/Noahw3Uj8zF2WQesTHkNqZ3CVAo87JDQ1bcsFG0o', 100, 'employee', 4);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Five', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@five.fr', '$argon2id$v=19$m=65536,t=3,p=4$80JF2gd897jx+Azd97A6gQ$3U+deKYmZPUT2jjJ/jODNw7n2CGiTC6rh8vMGEZnAQY', 20, 'employee', 7);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Six', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@six.fr', '$argon2id$v=19$m=65536,t=3,p=4$7gMz+GzgtJlYI3fKCRFS6A$at1Nnl9endpNUb4rRv/iAS53dP1ucyj9JtsftH5F29g', 24, 'employee', 9);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Seven', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@seven.fr', '$argon2id$v=19$m=65536,t=3,p=4$ULniOussnSgYyHchDXti1w$dE7HxCID0s5x7q/lDOW7rjTkPyK9uanzCkQ5v/w+k2Y', 28, 'developper', 10);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Height', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@height.fr', '$argon2id$v=19$m=65536,t=3,p=4$/o6Y3DNGOlEfv4TnLqaCfA$IqYvOq1TV4NxCNNdW8dnL19ZlBhue1A8Urv/gB7JULA', 28, 'tester', 11);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Nine', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@nine.fr', '$argon2id$v=19$m=65536,t=3,p=4$aVeYLadBjKgJwN3duAeLnw$jFXUxW18SpAUHcJml8pp5qJOvjlRGSoN/dSIpQ/2Siw', 28, 'tester', 12);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('User', 'Ten', 'https://previews.123rf.com/images/jemastock/jemastock1911/jemastock191133429/134121474-gar%C3%A7on-d%C3%A9guis%C3%A9-avec-un-masque-de-faux-nez-moustache-et-lunettes-profil-avatar-personnage-de-dessin.jpg', 'user@ten.fr', '$argon2id$v=19$m=65536,t=3,p=4$UE5Kf1DsL2gZwbiyimTzMQ$59qGUJcRC32rYx2Xi/Sdswe7TcNmoDyiNd+mtQXmzZI', 28, 'cto', 13);
INSERT INTO public."user" (firstname, lastname, image_link, email, password, age, role, id) VALUES ('user', 'twelve', 'https://images.unsplash.com/photo-1700675654205-408570c8078c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D', 'user@twelve.fr', '$argon2id$v=19$m=65536,t=3,p=4$VZOmiOwgXTcg9Ik9J/IiUw$zumTutRdpDnjfgmaN2bm2mbcrTf+VAJmOlpqMl6Zrng', 30, 'teacher', 14);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 14, true);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

