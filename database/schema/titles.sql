CREATE TABLE IF NOT EXISTS "titles" (
  "tconst" varchar(1024) NOT NULL,
  "titletype" varchar(1024),
  "primarytitle" varchar(1024),
  "originaltitle" varchar(1024),
  "isadult" boolean,
  "startyear" int,
  "endyear" int,
  "runtimeminutes" int,
  "genres" varchar(1024),
  CONSTRAINT pk_titles PRIMARY KEY ("tconst")
) WITH (
  OIDS=FALSE
);