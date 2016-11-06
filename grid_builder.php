<?php
/**
 * Plugin Name: Grid Builder
 * Description: Grid builder plugin with gridstack.js
 * Version: 0.2.0
 * Author: Paulius Krutkis
 * License: MIT
 */

include(plugin_dir_path( __FILE__ ) . 'vendor/wp-less/wp-less.php');
include(plugin_dir_path( __FILE__ ) . 'inc/enqueue.php');
include(plugin_dir_path( __FILE__ ) . 'inc/post_types.php');
include(plugin_dir_path( __FILE__ ) . 'inc/metabox.php');
include(plugin_dir_path( __FILE__ ) . 'inc/shortcode_collection.php');

include(plugin_dir_path( __FILE__ ) . 'inc/shortcodes/background.php');
include(plugin_dir_path( __FILE__ ) . 'inc/shortcodes/text.php');
