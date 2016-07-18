<?php

class Mapper
{
	static $mapped_shortcodes = array();

	public static function map_shortcode($new_shortcode_parameters){
		self::$mapped_shortcodes[] = $new_shortcode_parameters;
	}

	public static function get_mapped_shortcodes(){
		return self::$mapped_shortcodes;
	}
}

function map($parameters){
	Mapper::map_shortcode($parameters);
}

// CTP Tetris

function tetris_ctp() {

	register_post_type( 'tetris',
		array(
			'labels' => array(
				'name' => __( 'Tetris' ),
				'singular_name' => __( 'Tetris' )
			),
			'public' => true,
			'has_archive' => false,
            'menu_icon' => 'dashicons-schedule',
			'public' => false,
			'show_ui' => true,
			'supports' => array('title')
		)
	);
}

add_action( 'init', 'tetris_ctp' );

// Admin scripts

function tetris_admin_scripts() {
    // css
	wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
    wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
	wp_enqueue_style('tetris-admin-less', plugins_url('/admin.less',__FILE__ ));

    // js
	wp_enqueue_media();
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js');
	wp_enqueue_script('lodash-js', '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js');
    wp_enqueue_script('gridstack-js', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.js');
	wp_enqueue_script('pubsub-js',  plugins_url('../pubsub.js',__FILE__ ));
	wp_enqueue_script('tetris-js',  plugins_url('../tetris.js',__FILE__ ));
	wp_enqueue_script('dialog-js',  plugins_url('../dialog.js',__FILE__ ));
	wp_localize_script('tetris-js', 'editor', array( 'ajax_url' => admin_url( 'admin-ajax.php' )));
}

add_action( 'admin_enqueue_scripts', 'tetris_admin_scripts' );

// Tetris metabox

include(plugin_dir_path( __FILE__ ) . 'metabox.php');
