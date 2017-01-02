
<!-- TODO: localization -->
<button type="button" class="btn add-block" name="button"><?php _e('Add') ?></button>

<div class="grid-stack grid-stack-main"></div>

<div class="block-modal" title="Edit block">
    <div class="shortcode-tree">
        <?php
        foreach(Grid::get() as $shortcode){
            $base = (!empty($shortcode['base'])) ? $shortcode['base'] : '';
            $name = (!empty($shortcode['name'])) ? $shortcode['name'] : '';
            $class = (!empty($shortcode['class'])) ? $shortcode['class'] : '';

            echo '<button type="button" class="'.$class.'" name="shortcode-button" data-shortcode="'.$base.'">'.$name.'</button>';
        }
        ?>
    </div>
    <div class="fields"></div>
</div>

<input type="text" class="grid-data" style="width: 100%" name="grid-data" value="<?php echo esc_attr(get_post_meta($post->ID, 'gird_data', true)); ?>">
