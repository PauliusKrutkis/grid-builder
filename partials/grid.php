<!-- TODO: localization -->

<button type="button" class="btn add-block" name="button"><?php _e('Add') ?></button>

<div class="grid-stack grid-stack-main"></div>

<input type="text" class="grid-data" style="width: 100%" name="grid-data" value="<?php echo esc_attr(get_post_meta($post->ID, 'gird_data', true)); ?>">

<?php include(plugin_dir_path( __FILE__ ) . '../partials/hidden-editor.php'); ?>

<?php include(plugin_dir_path( __FILE__ ) . '../partials/modal.php'); ?>
