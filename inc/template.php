<button type="button" class="btn add-block" name="button">Add</button>

<div class="grid-stack grid-stack-main"></div>

<div class="block-modal" title="Edit block">
    <div class="shortcode-tree">
        <?php
        foreach(Shortcode_Collection::get_shortcodes() as $shortcode){
            $name = (!empty($shortcode['name'])) ? $shortcode['name'] : '';
            $class = (!empty($shortcode['class'])) ? $shortcode['class'] : '';

            echo '<button type="button" class="'.$class.'" name="shortcode-button" data-shortcode="'.$name.'">'.$name.'</button>';
        }
        ?>
    </div>
</div>

<input type="text" class="grid-data" style="width: 100%" name="grid-data" value="<?php echo esc_attr(get_post_meta($post->ID, 'gird_data', true)); ?>">
