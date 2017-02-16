<?php global $post ?>

<input type="text"
    name="shortcode"
    value='[<?php echo $this->config['shortcode']['name'] ?> id="<?php echo $post->ID ?>"]' 
    readonly="readonly">
