create table posts
(
  id            serial not null
    constraint posts_pkey
      primary key,
  title         varchar(50),
  content       text,
  up_votes      integer,
  down_votes    integer,
  created_at    date,
  updated_at    date,
  is_down_voted boolean default false,
  is_up_voted   boolean default false
);

alter table posts
  owner to postgres;

create table comments
(
  id         serial not null
    constraint comments_pkey
      primary key,
  content    text,
  likes      integer,
  post_id    integer
    constraint comments_post_id_fkey
      references posts,
  created_at date,
  updated_at date,
  was_liked  boolean default false
);

alter table comments
  owner to postgres;
