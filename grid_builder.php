<?php
/**
 * Plugin Name: Grid Builder
 * Description: Grid builder plugin with gridstack.js
 * Version: 1.0.0
 * Author: Paulius Krutkis
 * License: GPLv2
 */

if (!defined('ABSPATH')) exit;

remove_filter('the_content', 'wpautop');

include(plugin_dir_path( __FILE__ ) . 'Grid_Builder_Grid_Manager.php');
include(plugin_dir_path( __FILE__ ) . 'Grid_Builder_Shortcode_Manager.php');
$config = include(plugin_dir_path( __FILE__ ) . 'config.php');
$shortcodes = include(plugin_dir_path( __FILE__ ) . 'shortcodes.php');

$shortcodeManager = new Grid_Builder_Shortcode_Manager($shortcodes);
$grid = new Grid_Builder_Grid_Manager($config);

foreach ($shortcodes as $shortcode) {
    $grid->map($shortcode);
}

if (!function_exists('gbMap')) {
    function gbMap($shortcode)
    {
        Grid_Builder_Grid_Manager::map($shortcode);
    }
}
