<?php

return [
    'settings' => [
        'columns' => [
            'setting' => 'varchar(50) NOT NULL',
            'value' => 'mediumtext NOT NULL',
            'is_array' => 'tinyint(1) NOT NULL',
        ],
        'uniqueKeys' => [
            'setting' => ['setting']
        ],
    ],
    'pages' => [
        'columns' => [
            'name' => 'varchar(255)',
            'layout' => 'varchar(255)',
            'data' => 'longtext',
            'slug' => 'varchar(255)',
            'parent_id' => 'int',
            'updated_at' => 'timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            'created_at' => 'timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP',
        ],
        'uniqueKeys' => [],
    ],
    'menus' => [
        'columns' => [
            'name' => 'varchar(255)',
            'pages' => 'mediumtext',
        ],
        'uniqueKeys' => [
            'name' => ['name']
        ],
    ],
    'page_translations' => [
        'columns' => [
            'page_id' => 'int NOT NULL',
            'locale' => 'varchar(50) NOT NULL',
            'title' => 'varchar(255)',
            'meta_title' => 'varchar(255)',
            'meta_description' => 'varchar(255)',
            'route' => 'varchar(255)',
            'updated_at' => 'timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
            'created_at' => 'timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP',
        ],
        'uniqueKeys' => [
            'page_id' => ['page_id','locale']
        ],
    ],
    'uploads' => [
        'columns' => [
            'public_id' => 'varchar(50)',
            'original_file' => 'varchar(512)',
            'mime_type' => 'varchar(50)',
            'server_file' => 'varchar(512)',
        ],
        'uniqueKeys' => [
            'public_id' => ['public_id'],
            'server_file' => ['server_file']
        ],
    ],
];
