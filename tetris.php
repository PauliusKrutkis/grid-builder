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
include(plugin_dir_path( __FILE__ ) . 'admin/admin.php');

// Frontend functions
include(plugin_dir_path( __FILE__ ) . 'frontend/frontend.php');

// TODO: make a textarea input on each block, so the user could insert text
