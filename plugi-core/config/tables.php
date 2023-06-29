<?php

return [
    'settings' => "CREATE TABLE `settings` (
                      `id` int NOT NULL,
                      `setting` varchar(50) NOT NULL,
                      `value` mediumtext NOT NULL,
                      `is_array` tinyint(1) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                    ALTER TABLE `settings`
                      ADD PRIMARY KEY (`id`),
                      ADD UNIQUE KEY `setting` (`setting`);
                    ALTER TABLE `settings`
                      MODIFY `id` int NOT NULL AUTO_INCREMENT;",
    'pages' => "CREATE TABLE `pages` (
                  `id` int NOT NULL,
                  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                  `layout` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                  `data` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci,
                  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                INSERT INTO `pages` (`id`, `name`, `layout`, `data`, `updated_at`, `created_at`) VALUES
                (1, 'Home', 'master', NULL, '2023-06-05 07:10:09', '2023-06-05 07:10:09'),
                (2, 'About', 'master', NULL, '2023-06-05 07:10:57', '2023-06-05 07:10:57');
                ALTER TABLE `pages`
                  ADD PRIMARY KEY (`id`);
                ALTER TABLE `pages`
                  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;",
    'menus' => "CREATE TABLE `menus` (
                  `id` int NOT NULL,
                  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
                  `pages` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                INSERT INTO `menus` (`id`, `name`, `pages`) VALUES
                (1, 'Main', '1,2'),
                (2, 'Footer', '1');
                ALTER TABLE `menus`
                  ADD PRIMARY KEY (`id`),
                  ADD UNIQUE KEY `menu` (`name`);
                ALTER TABLE `menus`
                  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;",
    'page_translations' => "CREATE TABLE `page_translations` (
                              `id` int NOT NULL,
                              `page_id` int NOT NULL,
                              `locale` varchar(50) NOT NULL,
                              `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                              `meta_title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                              `meta_description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                              `route` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
                              `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                              `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                            INSERT INTO `page_translations` (`id`, `page_id`, `locale`, `title`, `meta_title`, `meta_description`, `route`, `updated_at`, `created_at`) VALUES
                            (1, 1, 'de', 'Home', 'Home', 'Home', '/', '2023-06-05 07:10:09', '2023-06-05 07:10:09'),
                            (2, 2, 'de', 'About', 'About', 'Description', '/about', '2023-06-05 07:10:57', '2023-06-05 07:10:57');
                            ALTER TABLE `page_translations`
                              ADD PRIMARY KEY (`id`),
                              ADD UNIQUE KEY `page_id` (`page_id`,`locale`);
                            ALTER TABLE `page_translations`
                              MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;",
    'uploads' => "CREATE TABLE `uploads` (
                      `id` int NOT NULL,
                      `public_id` varchar(50) NOT NULL,
                      `original_file` varchar(512) NOT NULL,
                      `mime_type` varchar(50) NOT NULL,
                      `server_file` varchar(512) NOT NULL
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
                    ALTER TABLE `uploads`
                      ADD PRIMARY KEY (`id`),
                      ADD UNIQUE KEY `public_id` (`public_id`),
                      ADD UNIQUE KEY `server_file` (`server_file`);
                    ALTER TABLE `uploads`
                      MODIFY `id` int NOT NULL AUTO_INCREMENT;",
];
