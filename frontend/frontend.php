<?php

// Tetris shortcode

include(plugin_dir_path( __FILE__ ) . 'shortcode.php');

// Frontend scripts

function tetris_frontend_scripts() {
    // css
    wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
	wp_enqueue_style('tetris-frontend-css', plugins_url('/frontend.less',__FILE__ ));

    // js
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js');
	wp_enqueue_script('lodash-js', 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js');
    wp_enqueue_script('gridstack-js', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.js');
    wp_enqueue_script('tetris-js',  plugins_url('../tetris.js',__FILE__ ));
}

add_action('wp_enqueue_scripts', 'tetris_frontend_scripts' );
