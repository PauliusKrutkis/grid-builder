<!-- TODO: localization -->

<?php

global $post;
$data = $this->playground['data'];
wp_nonce_field($data, $data.'_nonce');

?>

<button type="button" class="btn add-block"><span><?php _e('Add Block', $this->namespace) ?></span></button>

<div class="grid-stack <?php echo $this->playground['grid'] ?>"></div>

<input type="hidden"
    name="<?php echo $data ?>"
    autocomplete="off"
    value="<?php echo esc_attr(get_post_meta($post->ID, $data, true)); ?>"
    />

<div class="hidden"><?php wp_editor('', 'hidden_editor'); ?></div>

<div class="<?php echo $this->playground['modal'] ?>" title="<?php _e('Edit Block', $this->namespace) ?>">
    <div class="shortcode-tree">
        <?php
        foreach($this->get() as $shortcode){
            $shortcodeParams = $this->config['shortcode_params'];

            foreach ($shortcodeParams as $paramName) {
                $$paramName = (array_key_exists($paramName, $shortcode)) ? $shortcode[$paramName] : '';
            }

            echo '<button type="button" class="btn '.$class.'" name="shortcode-button"
                data-shortcode-name="'.$name.'"
                data-shortcode="'.$base.'">
                <span>'.$name.'</span>
            </button>';
        }
        ?>
    </div>
    <div class="fields"></div>
</div>

<script type="text/javascript">
jQuery(document).ready(function(e) {
    if(typeof(editorSettings) == 'undefined') {
        editorSettings = JSON.stringify(tinyMCEPreInit);
    }
});
</script>
