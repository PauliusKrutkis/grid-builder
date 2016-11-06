<?php

function side_meta($post) {
    echo '<input type="text" name="shortcode" value="[grid id='.$post->ID.']" readonly="readonly">';
}

function register_metabox(){
    global $post;

    add_meta_box('grid-main-metabox', __('Grid'), 'main_meta', 'grid');

    if(get_post_status($post->ID) == 'publish')
        add_meta_box('grid-site-metabox', __( 'Grid shortcode'), 'side_meta', 'grid', 'side');
}

add_action('add_meta_boxes', 'register_metabox');

function main_meta($post) {
    wp_nonce_field('grid_data', 'grid_data_nonce');

    $grid_data = get_post_meta($post->ID, 'gird_data', true);

    include(plugin_dir_path( __FILE__ ) . 'template.php');
}

function update_grid_data($post_id){
    if (!isset( $_POST['grid_data_nonce'])) return $post_id;

    $nonce = $_POST['grid_data_nonce'];

    if (!wp_verify_nonce($nonce, 'grid_data')) return $post_id;

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $post_id;

    if('grid' == $_POST['post_type'])
        if(!current_user_can('edit_page', $post_id)) return $post_id;
    else
        if(!current_user_can('edit_post', $post_id)) return $post_id;

    $grid_data = $_POST['grid-data'];

    update_post_meta($post_id, 'gird_data', $grid_data);
}

add_action('save_post', 'update_grid_data');
