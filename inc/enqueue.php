<?php

add_action('wp-less_compiler_construct_pre', function($compiler){
    $compiler->setFormatter('compressed');
});

function frontend_enqueue(){

    // jQuery-ui

    wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js');

    // gridstack

    wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
    wp_enqueue_script('gridstack-js', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.js');

    // lodash

    wp_enqueue_script('lodash-js', '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js');

    // custom

    wp_enqueue_script('build', plugins_url('../assets/js/build.js',__FILE__ ), array('jquery'), null, true);
    // wp_localize_script('tetris-js', 'wp', array('ajax' => admin_url('admin-ajax.php')));

}

// add_action('wp_enqueue_scripts', 'frontend_enqueue');

function admin_enqueue() {

    wp_enqueue_media();

    // jQuery-ui

    wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
    wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js', array('jquery'), null, true);

    // gridstack

    wp_enqueue_style('gridstack-css', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.css');
    wp_enqueue_script('gridstack-js', '//cdnjs.cloudflare.com/ajax/libs/gridstack.js/0.2.5/gridstack.min.js', array('jquery'), null, true);

    // lodash

    wp_enqueue_script('lodash-js', '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.13.1/lodash.min.js');

    // custom

    wp_enqueue_style('less', plugins_url('../assets/css/main.less',__FILE__ ));
    wp_enqueue_script('build', plugins_url('../assets/js/build.js',__FILE__ ), array('jquery'), null, true);
    // wp_localize_script('tetris-js', 'wp', array('ajax' => admin_url('admin-ajax.php')));

}

add_action('admin_enqueue_scripts', 'admin_enqueue');
