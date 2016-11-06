<?php

function get_editor() {
	ob_start();

	wp_editor('', 'editor', array('editor_height' => 400));

	\_WP_Editors::enqueue_scripts();
	print_footer_scripts();
	\_WP_Editors::editor_js();

	echo ob_get_clean();
	die();
}

add_action('wp_ajax_get_editor', 'get_editor');
