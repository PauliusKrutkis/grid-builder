<?php

function grid_cpt(){
    register_post_type('grid',
    array(
        'labels' => array(
            'name' => __('Grid'),
            'singular_name' => __('Grid')
        ),
        'has_archive' => false,
        'menu_icon' => 'dashicons-schedule',
        'public' => false,
        'show_ui' => true,
        'supports' => array('title')
        )
    );
}

add_action('init', 'grid_cpt');
