<?php
/**
 * Plugin Name: Grid Builder
 * Description: Grid builder plugin with gridstack.js
 * Version: 0.2.0
 * Author: Paulius Krutkis
 * License: MIT
 */

if (!defined('ABSPATH')) exit;

include(plugin_dir_path( __FILE__ ) . 'Grid.php');
$config = include(plugin_dir_path( __FILE__ ) . 'config.php');

$grid = new Grid($config);
include(plugin_dir_path( __FILE__ ) . 'inc/post_types.php');
include(plugin_dir_path( __FILE__ ) . 'inc/shortcodes.php');
