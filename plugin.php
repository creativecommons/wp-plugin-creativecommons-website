<?php
/**
 * Plugin Name: Vocabulary blocks 
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Vocabulary blocks is a collection of CC Vocabulary components as Gutenberg blocks
 * Author: Creative Commons
 * Author URI: https://creativecommns.org
 * Version: 2020.09.1
 * License: MIT
 * License URI: https://github.com/creativecommons/wp-plugin-vocabulary-blocks/blob/master/LICENSE
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
