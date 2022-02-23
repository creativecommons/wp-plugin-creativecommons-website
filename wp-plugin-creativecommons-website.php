<?php

/**
 * Plugin Name: Creative Commons website plugin
 * Author: Creative Commons
 * Author URI: http://creativecommons.org
 * Plugin URI: http://creativecommons.org
 * Description: Customizations of the Author for the Creative Commons site.
 * Version: 0.3.0
 * License: GPL2
 *
 * --------------------------------------------------------------------
 *
 * Creative Commons Author - Collects and displays additional information about Authors.
 * Copyright (C) 2016 Creative Commons
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

include_once 'cc-author/cc-author.php';
include(plugin_dir_path(__FILE__) . 'blocks/users-list/query.php');
require(plugin_dir_path(__FILE__) . 'vendor/autoload.php');
require(plugin_dir_path(__FILE__) . 'block-patterns/team-member-profile.php');

/* CC Gutenberg blocks */
function load_cc_gutenberg_blocks()
{
    $asset_file = include(plugin_dir_path(__FILE__) . 'build/index.asset.php');

    wp_register_script(
        'Creative Commons website plugin',
        plugins_url('build/index.js', __FILE__),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    // Adding custom styles
    wp_enqueue_style(
        'Creative Commons website plugin',
        plugins_url('styles/users-list.css', __FILE__),
        filemtime(plugin_dir_path(__FILE__) . 'styles/users-list.css')
    );

    //Registering block
    register_block_type('common/users-list', array(
        'api_version' => 2,
        'style' => 'Creative Commons website plugin',
        'editor_script' => 'Creative Commons website plugin',
        'render_callback' => 'users_list_renderer',
        'attributes'      => array(
            'selectedValue' => array(
                'type' => 'string'
            )
        )
    ));
}
add_action('init', 'load_cc_gutenberg_blocks');

/* CC Author */
add_action('show_user_profile', 'cc_author_add_custom_user_profile_fields');
add_action('edit_user_profile', 'cc_author_add_custom_user_profile_fields');
add_action('personal_options_update',  'cc_author_save_custom_user_profile_fields');
add_action('edit_user_profile_update', 'cc_author_save_custom_user_profile_fields');
add_action('bcn_after_fill', 'cc_author_customize_breadcrumb');


if (!function_exists('user_group')) {
    function user_group()
    {
        register_taxonomy('group', 'user', array(
            'show_in_rest'               => true,
        ));
    }
    add_action('init', 'user_group', 0);
}
