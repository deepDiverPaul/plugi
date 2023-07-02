<?php

return [
    'title' => 'Button',
    'category' => 'Layout',
    'hidden' => true,
    'icon' => 'fa fa-hand-peace-o',
    'settings' => [
        "order" => [
            "type" => "select",
            "label" => "Image Position",
            "value" => "md:flex-row",
            "options" => [
                [
                    "id" => "md:flex-row",
                    "name" => "Right"
                ],
                [
                    "id" => "md:flex-row-reverse",
                    "name" => "Left"
                ]
            ]
        ],
    ]
];
