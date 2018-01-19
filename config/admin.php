<?php
return [

    /* Settings access to admin dashboard */
    'admin_path' => 'backend',

    /* Settings thumbnails */
    'thumbnails' => [
        /* Default thumbnails */
        [
            'name' => 'admin_prev_small',
            'width' => 50,
            'height' => 50
        ],
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
        ]
    ],
];