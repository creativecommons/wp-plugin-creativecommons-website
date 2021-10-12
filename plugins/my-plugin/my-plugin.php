<?php
/**
 * Plugin Name: Users List
 * Author: Shailee Mehta
 * Version: 1.0.0
 */
  
include './apis/queries.php';


function loadMyBlock2() {
 
  // automatically load dependencies and version
  $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

  wp_register_script(
      'my-plugin-script',
      plugins_url( 'build/index.js', __FILE__ ),
      $asset_file['dependencies'],
      $asset_file['version']
  );

  register_block_type( 'common/my-plugin', array(
      'api_version' => 2,
      'editor_script' => 'my-plugin-script',
  ) );

}


add_action( 'init', 'loadMyBlock2' );