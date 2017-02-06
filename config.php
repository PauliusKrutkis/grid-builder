<?php

// TODO: refactor metabox template, and template management in general

$config = array(
    'namespace' => 'todo',
    'metaboxes' => array(
        'Grid' => array(
            'template' => 'partials/playground.php',
            'position' => 'normal',
        ),
        'Grid shortcode' => array(
            'template' => 'partials/info.php',
            'position' => 'side'
        )
    ),
    'data' => 'grid-data',
    'mce' => 'grid-builder-mce',
    'post_type' => array(
        'name' => 'grid',
        'icon' => 'dashicons-schedule'
    ),
    'field_types' => array('textfield', 'textarea-html', 'dropdown', 'colorpicker', 'image'),
    'field_params' => array('name', 'type', 'heading', 'value', 'placeholder'),
    'shortcode_params' => array('name', 'base', 'class', 'params')
);

return $config;
