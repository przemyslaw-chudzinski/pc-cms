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

        'dashboard' => [
            'name' => 'Admin dashboard',
            'actions' => [
                'index' => [
                    'display_name' => 'Access to admin dashboard',
                    'route_name' => 'admin.backend.index'
                ]
            ]
        ],

        'blog' => [
            'upload_dir' => 'blog',
            'name' => 'Blog',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of articles view',
                    'route_name' => 'admin.articles.index'
                ],
                'create' => [
                    'display_name' => 'Show create new article form view',
                    'route_name' => 'admin.articles.create'
                ],
                'edit' => [
                    'display_name' => 'Show article edit form view',
                    'route_name' => 'admin.articles.edit'
                ],
                'store' => [
                    'display_name' => 'Create new article action',
                    'route_name' => 'admin.articles.store'
                ],
                'update' => [
                    'display_name' => 'Update article action',
                    'route_name' => 'admin.articles.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete article action',
                    'route_name' => 'admin.articles.destroy'
                ]
            ]
        ],

        'projects' => [
            'upload_dir' => 'projects',
            'name' => 'Projects',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of projects view',
                    'route_name' => 'admin.projects.index'
                ],
                'create' => [
                    'display_name' => 'Show create new project form view',
                    'route_name' => 'admin.projects.create'
                ],
                'edit' => [
                    'display_name' => 'Show project edit form view',
                    'route_name' => 'admin.projects.edit'
                ],
                'store' => [
                    'display_name' => 'Create new project action',
                    'route_name' => 'admin.projects.store'
                ],
                'update' => [
                    'display_name' => 'Update project action',
                    'route_name' => 'admin.projects.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete project action',
                    'route_name' => 'admin.projects.destroy'
                ]
            ]
        ],

        'blog_categories' => [
            'upload_dir' => 'blogCategories',
            'name' => 'Blog categories',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of blog categories view',
                    'route_name' => 'admin.articles.categories.index'
                ],
                'create' => [
                    'display_name' => 'Show create new blog category form view',
                    'route_name' => 'admin.articles.categories.create'
                ],
                'edit' => [
                    'display_name' => 'Show blog category edit form view',
                    'route_name' => 'admin.articles.categories.edit'
                ],
                'store' => [
                    'display_name' => 'Create new blog category action',
                    'route_name' => 'admin.articles.categories.store'
                ],
                'update' => [
                    'display_name' => 'Update blog category action',
                    'route_name' => 'admin.articles.categories.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete blog category action',
                    'route_name' => 'admin.articles.categories.destroy'
                ]
            ]
        ],

        'pages' => [
            'upload_dir' => 'pages',
            'name' => 'Pages',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of pages view',
                    'route_name' => 'admin.pages.index'
                ],
                'create' => [
                    'display_name' => 'Show create new page form view',
                    'route_name' => 'admin.pages.create'
                ],
                'edit' => [
                    'display_name' => 'Show page edit form view',
                    'route_name' => 'admin.pages.edit'
                ],
                'store' => [
                    'display_name' => 'Create new page action',
                    'route_name' => 'admin.pages.store'
                ],
                'update' => [
                    'display_name' => 'Update page action',
                    'route_name' => 'admin.pages.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete page action',
                    'route_name' => 'admin.pages.destroy'
                ]
            ]
        ],

        'project_categories' => [
            'upload_dir' => 'projectCategories',
            'name' => 'Project categories',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of project categories view',
                    'route_name' => 'admin.projects.categories.index'                ],
                'create' => [
                    'display_name' => 'Show create new project category form view',
                    'route_name' => 'admin.projects.categories.create'
                ],
                'edit' => [
                    'display_name' => 'Show project category edit form view',
                    'route_name' => 'admin.projects.categories.edit'               ],
                'store' => [
                    'display_name' => 'Create new project category action',
                    'route_name' => 'admin.projects.categories.store'                ],
                'update' => [
                    'display_name' => 'Update project category action',
                    'route_name' => 'admin.projects.categories.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete project category action',
                    'route_name' => 'admin.projects.categories.destroy'
                ]
            ]
        ],

        'settings' => [
            'upload_dir' => 'settings',
            'name' => 'Settings',
            'actions' => [
                'index' => [
                    'display_name' => 'Show settings view',
                    'route_name' => 'admin.settings.index'
                ],
                'create' => [
                    'display_name' => 'Show create new setting form view',
                    'route_name' => null
                ],
                'store' => [
                    'display_name' => 'Create new setting action',
                    'route_name' => 'admin.settings.store'
                ],
                'update' => [
                    'display_name' => 'Update setting action',
                    'route_name' => 'admin.settings.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete setting action',
                    'route_name' => 'admin.settings.destroy'
                ]
            ],

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
            'upload_dir' => 'menus',
            'name' => 'Menus',
            'actions' => [
                'index' => [
                    'display_name' => 'Show menu view',
                    'route_name' => 'admin.menus.index'
                ],
                'create' => [
                    'display_name' => 'Show create new menu form view',
                    'route_name' => 'admin.menus.create'
                ],
                'edit' => [
                    'display_name' => 'Show edit menu form view',
                    'route_name' => 'admin.menus.edit'
                ],
                'store' => [
                    'display_name' => 'Create new menu action',
                    'route_name' => 'admin.menus.store'
                ],
                'update' => [
                    'display_name' => 'Update menu action',
                    'route_name' => 'admin.settings.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete menu action',
                    'route_name' => 'admin.menus.destroy'
                ],
                'item_store' => [
                    'display_name' => 'Create new item action',
                    'route_name' => 'admin.menus.items.store'
                ],
                'item_destroy' => [
                    'display_name' => 'Delete menu item action',
                    'route_name' => 'admin.menus.items.destroy'
                ],
                'set_permissions' => [
                    'display_name' => 'Set permissions view',
                    'route_name' => 'admin.menus.builder'
                ]
            ],
            'link_targets' => [
                '_self' => 'The same window',
                '_blank' => 'Open in new card'
            ]
        ],

        'roles' => [
            'upload_dir' => 'roles',
            'name' => 'Roles',
            'actions' => [
                'index' => [
                    'display_name' => 'Show lists of roles view',
                    'route_name' => 'admin.users.roles.index'
                ],
                'create' => [
                    'display_name' => 'Show create new role form view',
                    'route_name' => 'admin.users.roles.create'
                ],
                'edit' => [
                    'display_name' => 'Show role edit form view',
                    'route_name' => 'admin.users.roles.edit'
                ],
                'store' => [
                    'display_name' => 'Create new role action',
                    'route_name' => 'admin.users.roles.store'
                ],
                'update' => [
                    'display_name' => 'Update role action',
                    'route_name' => 'admin.users.roles.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete role action',
                    'route_name' => 'admin.users.roles.destroy'
                ],
                'permission_set_permission' => [
                    'display_name' => 'Create new permission view',
                    'route_name' => 'admin.users.roles.setPermissions'
                ],
                'permission_update_permission' => [
                    'display_name' => 'Update permissions action',
                    'route_name' => 'admin.users.roles.updatePermissions'
                ]
            ]
        ],

        'segments' => [
            'upload_dir' => 'segments',
            'name' => 'Segments',
            'actions' => [
                'index' => [
                    'display_name' => 'Show segments list view',
                    'route_name' => 'admin.segments.index'
                ],
                'edit' => [
                    'display_name' => 'Show segments edit form view',
                    'route_name' => 'admin.segments.edit'
                ],
                'create' => [
                    'display_name' => 'Show segments create form view',
                    'route_name' => 'admin.segments.create'
                ],
                'store' => [
                    'display_name' => 'Create new segment action',
                    'route_name' => 'admin.segments.store'
                ],
                'update' => [
                    'display_name' => 'Update segment action',
                    'route_name' => 'admin.segments.update'
                ],
                'destroy' => [
                    'display_name' => 'Delete segment action',
                    'route_name' => 'admin.segments.destroy'
                ]
            ]
        ],

        'users' => [
            'upload_dir' => 'users',
            'name' => 'Users',
            'actions' => [
                'index' => [
                    'display_name' => 'Show users list view',
                    'route_name' => 'admin.users.index'
                ],
                'edit' => [
                    'display_name' => 'Show users edit form view',
                    'route_name' => 'admin.users.edit'
                ],
                'update' => [
                    'display_name' => 'Update user action',
                    'route_name' => 'admin.users.update'
                ],
                'create' => [
                    'display_name' => 'Show users create form view',
                    'route_name' => 'admin.users.create'
                ],
                'store' => [
                    'display_name' => 'Create new user action',
                    'route_name' => 'admin.users.store'
                ],
                'destroy' => [
                    'display_name' => 'Delete user action',
                    'route_name' => 'admin.users.destroy'
                ],
                'reset_password' => [
                    'display_name' => 'Reset user password',
                    'route_name' => 'admin.users.reset_password'
                ]
            ]
        ]
    ],
];