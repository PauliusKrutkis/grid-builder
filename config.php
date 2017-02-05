<?php

$config = array(
    'text_domain' => 'todo',
    'metaboxes' => array(
        'Grid' => array(
            'template' => '../partials/grid.php',
            'position' => 'normal'
        ),
        'Grid shortcode' => array(
            'template' => '../partials/grid-shortcode.php',
            'position' => 'side'
        )
    ),
    'post_type' => array(
        'name' => 'grid',
        'icon' => 'dashicons-schedule'
    ),
    'field_types' => array('textfield', 'textarea-html', 'dropdown', 'colorpicker', 'image'),
    'field_params' => array('name', 'type', 'heading', 'value', 'placeholder')
);

return $config;
