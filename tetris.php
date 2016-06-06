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

// TODO: remake the grid with php in the frontend
// TODO: make a dialog/modal for controll over individual blocks/widgets (maybe make a seperate module?)
// TODO: add an option for fullwidth grid
// TODO: add an ability to nest grids
