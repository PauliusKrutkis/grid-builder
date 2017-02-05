<!-- TODO: localization -->

<?php global $post; ?>

<?php wp_nonce_field('grid_data', 'grid_data_nonce'); ?>

<?php $grid_data = get_post_meta($post->ID, 'gird_data', true); ?>

<button type="button" class="btn add-block"><span><?php _e('Add Block') ?></span></button>

<div class="grid-stack grid-container grid-stack-main"></div>

<input type="hidden"
    class="grid-data"
    style="width: 100%"
    name="grid-data"
    autocomplete="off"
    value="<?php echo esc_attr(get_post_meta($post->ID, 'gird_data', true)); ?>"
    />

<?php include(plugin_dir_path( __FILE__ ) . '../partials/hidden-editor.php'); ?>

<?php include(plugin_dir_path( __FILE__ ) . '../partials/modal.php'); ?>
