<?php
return [

    /* Settings access to admin dashboard */
    'admin_path' => 'backend',

    /* Settings thumbnails */
    'thumbnails' => [
        /* Default thumbnails */
        [
            'name' => 'admin_prev_medium',
            'width' => 400,
            'height' => 300
        ],
        /* Themes thumbnails */
        [
            'name' => 'blog_thumbnail',
            'width' => 300,
            'height' => 200
        ],
    ],

    /* Form types */
    'form_types' => [
        [
            'type' => 'input_text',
            'name' => 'Input text'
        ],
        [
            'type' => 'textarea',
            'name' => 'Textarea field'
        ]
    ],

    /* Settings admin modules */
    'modules' => [

        'blog' => [
            'upload_dir' => 'blog'
        ],

        'projects' => [
            'upload_dir' => 'projects'
        ],

        'blog_categories' => [
            'upload_dir' => 'blogCategories'
        ],

        'pages' => [
            'upload_dir' => 'pages'
        ],

        'project_categories' => [
            'upload_dir' => 'projectCategories'
        ],

        'settings' => [
            'upload_dir' => 'settings',

            'defaults' => [
                [
                    'key' => 'site_title',
                    'value' => '',
                    'type' => 'input_text',
                    'description' => 'Site title'
                ],
                [
                    'key' => 'site_description',
                    'value' => '',
                    'type' => 'textarea',
                    'description' => 'Site description'
                ],
                [
                    'key' => 'google_analytics_tracking_code',
                    'value' => '',
                    'type' => 'textarea',
                    'description' => 'Google analaytics tracking code'
                ]
            ]
        ],

        'menus' => [
            'upload_dir' => 'menus'
        ],
    ],
];