CREATE TABLE IF NOT EXISTS "ratings" (
  "tconst" varchar NOT NULL,
  "averagerating" int,
  "numvotes" int,
  CONSTRAINT pk_ratings PRIMARY KEY ("tconst")
) WITH (
  OIDS=FALSE
);
