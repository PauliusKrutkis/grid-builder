<?php
/**
 * Plugin Name: Tetris
 * Description: Tetris plugin with gridstack.js
 * Version: 0.1.0
 * Author: Paulius Krutkis
 * License: GPL2
 */

// less compiler
include(plugin_dir_path( __FILE__ ) . 'vendor/wp-less/wp-less.php');

// admin functions
include(plugin_dir_path( __FILE__ ) . 'admin/admin.php');

// frontend functions
include(plugin_dir_path( __FILE__ ) . 'frontend/frontend.php');
