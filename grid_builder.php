<?php
/**
 * Plugin Name: Grid Builder
 * Description: Grid builder plugin with gridstack.js
 * Version: 0.3.0
 * Author: Paulius Krutkis
 * License: MIT
 */

if (!defined('ABSPATH')) exit;

remove_filter('the_content', 'wpautop');

include(plugin_dir_path( __FILE__ ) . 'Grid_Manager.php');
include(plugin_dir_path( __FILE__ ) . 'Shortcode_Manager.php');
$config = include(plugin_dir_path( __FILE__ ) . 'config.php');
$shortcodes = include(plugin_dir_path( __FILE__ ) . 'shortcodes.php');

$shortcodeManager = new Shortcode_Manager($shortcodes);
$grid = new Grid_Manager($config);

foreach ($shortcodes as $shortcode) {
    $grid->map($shortcode);
}

function gbMap($shortcode)
{
    Grid_Manager::map($shortcode);
}
