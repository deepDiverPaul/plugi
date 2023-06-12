<?php

return [
    'pages' => [
        'title' => phpb_trans('website-manager.pages'),
        'include' => __DIR__ . '/pages.php',
        'icon' => '<i class="ph ph-file"></i>',
    ],
    'menus' => [
        'title' => phpb_trans('website-manager.menus'),
        'include' => __DIR__ . '/menus.php',
        'icon' => '<i class="ph ph-list"></i>',
    ],
    'files' => [
        'title' => phpb_trans('website-manager.files'),
        'include' => __DIR__ . '/files.php',
        'icon' => '<i class="ph ph-folder-notch-open"></i>',
    ],
    'settings' => [
        'title' => phpb_trans('website-manager.settings'),
        'include' => __DIR__ . '/settings.php',
        'icon' => '<i class="ph ph-gear"></i>',
    ],
    'info' => [
        'title' => phpb_trans('website-manager.info'),
        'include' => __DIR__ . '/info.php',
        'icon' => '<i class="ph ph-info"></i>',
    ],
];
