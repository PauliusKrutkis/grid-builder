<?php

function frontend_enqueue(){

    // jQuery-ui

    wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js');

    // gridstack

    wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
    wp_enqueue_script('gridstack-js', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.js');

    // lodash

    wp_enqueue_script('lodash-js', '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js');

    // plugin

    wp_enqueue_script('build', plugins_url('../js/build.js', __FILE__ ), array('jquery'), null, true);

}

// add_action('wp_enqueue_scripts', 'frontend_enqueue');

function admin_enqueue() {

    wp_enqueue_media();
    wp_enqueue_style('wp-color-picker');

    // jQuery-ui

    wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
    wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js', array('jquery'), null, true);

    // gridstack

    // wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
    wp_enqueue_script('gridstack', plugins_url('../js/gridstack.all.js', __FILE__ ), array('jquery'), null, true);

    // sass

    wp_enqueue_style('styles', plugins_url('../css/main.css',__FILE__ ));

    // scripts

    wp_enqueue_script('build', plugins_url('../js/build.js',__FILE__ ), array('jquery', 'wp-color-picker'), null, true);

    // TODO: editor_id store in config
    wp_localize_script('build', 'wp', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'editor_id' => 'gb_mce'
    ));

}

add_action('admin_enqueue_scripts', 'admin_enqueue');
