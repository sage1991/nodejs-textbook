create table if not exists users
(
    `id`         int         not null auto_increment,
    `email`      varchar(40)          default null,
    `nickname`   varchar(15) not null,
    `password`   varchar(100)         default null,
    `provider`   varchar(10) not null default 'local',
    `sns_id`     varchar(30)          default null,
    `created_at` datetime    not null default CURRENT_TIMESTAMP,
    primary key (`id`),
    unique key `idx_users_email` (`email`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;

create table if not exists follows
(
    `follower_id`  int      not null,
    `following_id` int      not null,
    `created_at`   datetime not null default CURRENT_TIMESTAMP,
    primary key (`follower_id`, `following_id`),
    key `idx_follows_follower_id` (`follower_id`),
    key `idx_follows_following_id` (`following_id`),
    constraint `fk_follows_follower_id` foreign key (`follower_id`) references `users` (`id`),
    constraint `fk_follows_following_id` foreign key (`following_id`) references `users` (`id`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;

create table if not exists `posts`
(
    `id`         int          not null auto_increment,
    `content`    varchar(140) not null,
    `image`      varchar(200)          default null,
    `commenter`  int          not null,
    `created_at` datetime     not null default CURRENT_TIMESTAMP,
    primary key (`id`),
    key `idx_posts_commenter` (`commenter`),
    constraint `fk_posts_commenter` foreign key (`commenter`) references `users` (`id`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;

create table if not exists `hashtags`
(
    `id`         int         not null auto_increment,
    `title`      varchar(15) not null,
    `created_at` datetime    not null default CURRENT_TIMESTAMP,
    primary key (`id`),
    unique key `idx_hashtags_title` (`title`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;

create table if not exists `post_hashtag`
(
    `post_id`    int      not null,
    `hashtag_id` int      not null,
    `created_at` datetime not null default CURRENT_TIMESTAMP,
    primary key (`post_id`, `hashtag_id`),
    key `idx_post_hashtag_post_id` (`post_id`),
    key `idx_post_hashtag_hashtag_id` (`hashtag_id`),
    constraint `fk_post_hashtag_post_id` foreign key (`post_id`) references `posts` (`id`),
    constraint `fk_post_hashtag_hashtag_id` foreign key (`hashtag_id`) references `hashtags` (`id`)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_general_ci;
