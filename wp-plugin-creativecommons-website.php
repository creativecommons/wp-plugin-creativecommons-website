<?php

/**
 * Plugin Name: Creative Commons website plugin
 * Author: Shailee Mehta
 * Version: 1.0.0
 */

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
