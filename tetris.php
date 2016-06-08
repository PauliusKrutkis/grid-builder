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

// TODO: remove fullcreen mode button from the tinyMCE editor
// TODO: place the image controls inside the dialog
// TODO: make an option to choose a background color for the block (colorpicker)
// TODO: add an option for fullwidth grid
// TODO: add an ability to nest grids
