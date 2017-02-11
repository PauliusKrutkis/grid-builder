<?php

$config = array(
    'namespace' => 'todo',
    'metaboxes' => array(
        'Grid' => array(
            'template' => 'partials/playground',
            'position' => 'normal',
        ),
        'Grid shortcode' => array(
            'template' => 'partials/info',
            'position' => 'side'
        )
    ),
    'playground' => array(
        'data' => 'grid-data',
        'mce' => 'grid-builder-mce',
        'nesting' => true,
        'grid' => 'grid-container',
        'modal' => 'block-modal'
    ),
    'js_localization' => array(
        'save' => 'Save',
        'cancel' => 'Cancel'
    ),
    'post_type' => array(
        'name' => 'grid',
        'icon' => 'dashicons-schedule'
    ),
    'field_types' => array('textfield', 'textarea-html', 'dropdown', 'colorpicker', 'image'),
    'field_params' => array('name', 'type', 'heading', 'value', 'placeholder'),
    'shortcode_params' => array('name', 'base', 'class', 'params')
);

return $config;
