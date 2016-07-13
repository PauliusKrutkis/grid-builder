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
        <div id="tetris-dialog" title="Edit widget">
            <div id="dialogTabs">
                <ul>
                    <li><a href="#editor">Editor</a></li>
                    <li><a href="#options">Options</a></li>
                </ul>
                <div id="editor">
                    <div class="tetris-editor"></div>
                </div>
                <div id="options">
                    <p>Morbi tincidunt, dui sit amet facilisis feugiat, odio metus gravida ante, ut pharetra massa metus id nunc. Duis scelerisque molestie turpis. Sed fringilla, massa eget luctus malesuada, metus eros molestie lectus, ut tempus eros massa ut dolor. Aenean aliquet fringilla sem. Suspendisse sed ligula in ligula suscipit aliquam. Praesent in eros vestibulum mi adipiscing adipiscing. Morbi facilisis. Curabitur ornare consequat nunc. Aenean vel metus. Ut posuere viverra nulla. Aliquam erat volutpat. Pellentesque convallis. Maecenas feugiat, tellus pellentesque pretium posuere, felis lorem euismod felis, eu ornare leo nisi vel felis. Mauris consectetur tortor et purus.</p>
                </div>
            </div>
            <div class="spinner"></div>
        </div>
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

    $gridData = $_POST['grid-data'];

    update_post_meta($post_id, 'grid-data-key', $gridData);

}

add_action('save_post', 'save_tetris');

// WP Editor load function

function load_wp_editor() {

	ob_start();

	wp_editor('', 'tetris_wp_editor',
		array(
			'editor_height' => 400,
		)
	);

	\_WP_Editors::enqueue_scripts();
	print_footer_scripts();
	\_WP_Editors::editor_js();
	echo ob_get_clean();

	die();
}

add_action( 'wp_ajax_load_wp_editor', 'load_wp_editor' );
