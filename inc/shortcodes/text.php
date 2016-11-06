<?php

function text_shortcode($atts){

    return 'this is text shortcode';

}

add_shortcode('text', 'text_shortcode');

Shortcode_Collection::add_shortcode(array(
    'name' => 'Text',
    'shortcode' => 'text',
    'params' => array(
        'name' => 'content',
        'type' => 'textfield',
        'heading' => 'Content'
    )
));
