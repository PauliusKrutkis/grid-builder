<?php
/**
 * Plugin Name: Tetris
 * Description: Tetris plugin with gridstack.js
 * Version: 0.1.0
 * Author: Paulius Krutkis
 * License: GPL2
 */

 // Less compiler
 include(plugin_dir_path( __FILE__ ) . 'vendor/wp-less/wp-less.php');

// Admin functions
include(plugin_dir_path( __FILE__ ) . 'admin/functions.php');

// Frontend functions
include(plugin_dir_path( __FILE__ ) . 'frontend/functions.php');

// TODO: make a shortcode to display the grid in the front-end, display the
// shortcode in the backend so it is easy to grab
// TODO: refractor the admin/assets/scripts.js code
// TODO: add styles to the editor, use icons, etc...
