<?php

/**
 * Plugin Name: Creative Commons website plugin
 * Author: Creative Commons
 * Author URI: http://creativecommons.org
 * Plugin URI: http://creativecommons.org
 * Description: Customizations of the Author for the Creative Commons site.
 * Version: 1.0.0
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

/* CC Gutenberg blocks */
function load_cc_gutenberg_blocks()
{
    wp_enqueue_script(
        'myguten-script',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks')

    );

    register_block_type('common/users-list');
}
add_action('enqueue_block_editor_assets', 'load_cc_gutenberg_blocks');

/* CC Author */
add_action( 'show_user_profile', 'cc_author_add_custom_user_profile_fields' );
add_action( 'edit_user_profile', 'cc_author_add_custom_user_profile_fields' );
add_action( 'personal_options_update',  'cc_author_save_custom_user_profile_fields' );
add_action( 'edit_user_profile_update', 'cc_author_save_custom_user_profile_fields' );
add_action('bcn_after_fill', 'cc_author_customize_breadcrumb');
