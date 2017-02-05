<?php
/**
 * Plugin Name: Grid Builder
 * Description: Grid builder plugin with gridstack.js
 * Version: 0.3.0
 * Author: Paulius Krutkis
 * License: MIT
 */

if (!defined('ABSPATH')) exit;

include(plugin_dir_path( __FILE__ ) . 'inc/Grid.php');
$config = include(plugin_dir_path( __FILE__ ) . 'config.php');
$shortcodes = include(plugin_dir_path( __FILE__ ) . 'shortcodes.php');

$grid = new Grid($config);

foreach ($shortcodes as $shortcode) {
    $grid->map($shortcode);
}
