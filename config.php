<?php

return [
    /*
     |--------------------------------------------------------------------------
     | General settings
     |--------------------------------------------------------------------------
     |
     | General settings for configuring the PageBuilder.
     | If you install phpb with Composer, general.assets_url line must be:
     | 'assets_url' => '/vendor/hansschouten/plugi/dist',
     |
     */
    'general' => [
        'base_url' => 'http://localhost:63000',
        'language' => 'de',
        'assets_url' => '/plugi/dist',
        'uploads_url' => '/uploads'
    ],

    /*
     |--------------------------------------------------------------------------
     | Storage settings
     |--------------------------------------------------------------------------
     |
     | Database and file storage settings.
     |
     */
    'storage' => [
        'use_database' => true,
        'database' => [
            'driver'    => 'mysql',
            'host'      => 'mysql',
            'database'  => 'plugi',
            'username'  => 'plugi',
            'password'  => 'plugi',
            'charset'   => 'utf8',
            'collation' => 'utf8_unicode_ci',
            'prefix'    => '',
        ],
        'uploads_folder' => __DIR__ . '/uploads'
    ],

    /*
     |--------------------------------------------------------------------------
     | Auth settings
     |--------------------------------------------------------------------------
     |
     | By default an authentication class is provided which checks for the
     | credentials configured in this setting block.
     |
     */
    'auth' => [
        'use_login' => true,
        'class' => Plugi\Modules\Auth\Auth::class,
        'url' => '/admin/auth',
        'username' => 'admin',
        'password' => 'admin'
    ],

    /*
     |--------------------------------------------------------------------------
     | WebsiteManager settings
     |--------------------------------------------------------------------------
     |
     | By default a basic WebsiteManager is provided for creating/editing pages.
     |
     */
    'website_manager' => [
        'use_website_manager' => true,
        'class' => Plugi\Modules\WebsiteManager\WebsiteManager::class,
        'url' => '/admin'
    ],

    /*
     |--------------------------------------------------------------------------
     | Website settings
     |--------------------------------------------------------------------------
     |
     | By default a setting class is provided for accessing website settings.
     |
     */
    'setting' => [
        'class' => Plugi\Setting::class
    ],

    /*
     |--------------------------------------------------------------------------
     | PageBuilder settings
     |--------------------------------------------------------------------------
     |
     | By default a PageBuilder is provided based on GrapesJS.
     |
     */
    'pagebuilder' => [
        'class' => Plugi\Modules\GrapesJS\PageBuilder::class,
        'url' => '/admin/pagebuilder',
        'actions' => [
            'back' => '/admin'
        ]
    ],

    /*
     |--------------------------------------------------------------------------
     | Page settings
     |--------------------------------------------------------------------------
     |
     | By default a Page class is provided with knowledge about its layout and URL.
     |
     */
    'page' => [
        'class' => Plugi\Page::class,
        'table' => 'pages',
        'translation' => [
            'class' => Plugi\PageTranslation::class,
            'table' => 'page_translations',
            'foreign_key' => 'page_id',
        ]
    ],

    /*
     |--------------------------------------------------------------------------
     | Cache settings
     |--------------------------------------------------------------------------
     |
     | Faster load time by skipping block parsing if the page has been requested before.
     | A page will be cached, except if it contains a block with caching set to false.
     | This can be used to prevent caching pages with content that varies per page load.
     | The cached html is removed if the page is saved again in the page builder.
     |
     */
    'cache' => [
        'enabled' => false,
        'folder' => __DIR__ . '/cache',
        'class' => Plugi\Cache::class
    ],

    /*
     |--------------------------------------------------------------------------
     | Theme settings
     |--------------------------------------------------------------------------
     |
     | PageBuilder requires a themes folder in which for each theme the individual
     | theme blocks are defined. A theme block is a sub folder in the themes folder
     | containing a view, model (optional) and controller (optional).
     |
     */
    'theme' => [
        'class' => Plugi\Theme::class,
        'folder' => __DIR__ . '/themes',
        'folder_url' => '/themes',
        'active_theme' => 'phpb-demo-template'
    ],

    /*
     |--------------------------------------------------------------------------
     | Routing settings
     |--------------------------------------------------------------------------
     |
     | Settings for resolving pages based on the current URI.
     |
     */
    'router' => [
        'class' => Plugi\Modules\Router\DatabasePageRouter::class
    ],

    /*
     |--------------------------------------------------------------------------
     | Class replacements
     |--------------------------------------------------------------------------
     |
     | Allows mapping a class namespace to an alternative namespace,
     | useful for replacing implementations of specific pagebuilder classes.
     | Example: Plugi\UploadedFile::class => Alternative\UploadedFile::class
     | Important: when overriding a class always extend the original class.
     |
     */
    'class_replacements' => [
    ],
];
