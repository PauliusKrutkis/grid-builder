<?php

function tetris_register_metabox() {
    global $post;

    add_meta_box( 'tetris-metabox', __( 'Tetris', 'tetris' ), 'tetris_display', 'tetris' );

    if(get_post_status($post->ID) == 'publish')
        add_meta_box( 'tetris-metabox-side', __( 'Tetris shortcode', 'tetris' ), 'tetris_display_side', 'tetris', 'side' );
}

add_action('add_meta_boxes', 'tetris_register_metabox');

function tetris_display($post) {

    wp_nonce_field('tetris_box', 'tetris_box_nonce');

    $gridData = get_post_meta($post->ID, 'grid-data-key', true);

    ob_start();

    ?>
    <div class="tetris-module">
        <button type="button" id="add-widget" name="button">Add widget</button>
        <div class="grid-stack"></div>
        <input type="hidden" class="saved-data" autocomplete="off" name="grid-data" value="<?php echo esc_attr($gridData); ?>"/>
    </div>
    <?php

    $echo = ob_get_clean();

    echo $echo;
}

function tetris_display_side($post) {

    ob_start();

    ?>
        <input style="width: 100%" type="text" name="tetris_shortcode" value='[tetris id="<?php echo $post->ID ?>"]' readonly="readonly">
    <?php

    $echo = ob_get_clean();

    echo $echo;
}

function save_tetris( $post_id ) {

    if (!isset( $_POST['tetris_box_nonce'])) return $post_id;

    $nonce = $_POST['tetris_box_nonce'];

    if (!wp_verify_nonce($nonce, 'tetris_box')) return $post_id;

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $post_id;

    if('tetris' == $_POST['post_type'])
        if(!current_user_can('edit_page', $post_id)) return $post_id;
    else
        if(!current_user_can('edit_post', $post_id)) return $post_id;

    $gridData = sanitize_text_field( $_POST['grid-data'] );

    update_post_meta($post_id, 'grid-data-key', $gridData);

}

add_action('save_post', 'save_tetris');
