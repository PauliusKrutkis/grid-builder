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
