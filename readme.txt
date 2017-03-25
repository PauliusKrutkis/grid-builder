=== Plugin Name ===
Contributors: pauliusk
Tags: content, blocks, images, grid, block management, columns, resizable, sortable
Requires at least: 4.6
Tested up to: 4.7
Stable tag: 4.3
License: GPLv2
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Easy to use plugin to create elegant masonry style grid layouts for your pages and or posts with shortcode API.

== Description ==

With this plugin you can achieve complex grid layouts because each block can be placed anywhere in the canvas
with a set width and height. Grid is also responsive therefor on mobile each block will be placed on top of each other.

This plugin also provides a developer API for extending plugin capabilities. You can create your own custom block types with their
own options. To see available option field types for your block check config.php - "field_types". To see available field options
see config.php - "field_params". To see individual block (shortocode) options see config.php - "shortcode_params".

This plugin strongly uses wordpress shortcode API, that mean each block type is a wordpress shortcode. To register a new block type
use the gbMap function. This function should return an array of instruction of how this shortcode is structured: it's attributes (fields), base name (the same name you register to wordpress with add_shortcode function). You can see examples of how the array is structured in
shortcodes.php file. The shortcodes that you register to the grid builder also needs to be registered to wordpress (as you regularly would create a wordpress shortcode).

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/grid-builder` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress
1. Create grid layouts through Grid > Add new
