<?php

$shortcodes = array(
    'text' => array(
        'name' => 'Text',
        'base' => 'gb-text',
        'params' => array(
            array(
                'name' => 'content',
                'type' => 'textarea-html',
                'heading' => 'Content'
            ),
        )
    ),
    'image' => array(
        'name' => 'Image',
        'base' => 'gb-image',
        'params' => array(
            array(
                'name' => 'image',
                'type' => 'image',
                'heading' => 'Background image',
            )
        )
    )
);

return $shortcodes;
