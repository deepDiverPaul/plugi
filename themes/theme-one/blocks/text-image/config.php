<?php

return [
    'title' => 'Text + Image',
    'category' => 'General',
    'icon' => 'ph ph-square-half',
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
        "width" => [
            "type" => "select",
            "label" => "Image Width",
            "value" => "md:w-6/12",
            "options" => [
                [
                    "id" => "md:w-4/12",
                    "name" => "1/3"
                ],
                [
                    "id" => "md:w-6/12",
                    "name" => "1/2"
                ],
                [
                    "id" => "md:w-full",
                    "name" => "2/3"
                ],
            ]
        ],
        'headline' => [
            'label'=> 'Headline',
            'type' => 'text',
            'placeholder' =>'Headline',
            'value' => 'Lorem Ipsum dolor'
        ],
    ]
];
