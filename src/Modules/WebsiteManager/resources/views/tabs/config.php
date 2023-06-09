<?php

return [
    'pages' => [
            'title' => phpb_trans('website-manager.pages'),
            'include' => __DIR__ . '/pages.php',
    ],
    'menus' => [
            'title' => phpb_trans('website-manager.menus'),
            'include' => __DIR__ . '/menus.php',
    ],
    'files' => [
            'title' => phpb_trans('website-manager.files'),
            'include' => __DIR__ . '/files.php',
    ],
    'settings' => [
            'title' => phpb_trans('website-manager.settings'),
            'include' => __DIR__ . '/settings.php',
    ],
];
