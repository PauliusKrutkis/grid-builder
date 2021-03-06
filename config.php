<?php

$config = array(
    'namespace' => 'grid-builder',
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
        'nesting' => false,
        'grid' => 'grid-container',
        'modal' => 'block-modal'
    ),
    'js_localization' => array(
        'save' => 'Save',
        'cancel' => 'Cancel',
        'nested' => 'Add child block',
        'editb' => 'Edit block',
        'removesc' => 'Remove block shortcode',
        'deleteb' => 'Delete block'
    ),
    'post_type' => array(
        'name' => 'grid',
        'icon' => 'dashicons-schedule'
    ),
    'field_types' => array('textfield', 'textarea-html', 'dropdown', 'colorpicker', 'image'),
    'field_params' => array('name', 'type', 'heading', 'value', 'placeholder'),
    'shortcode_params' => array('name', 'base', 'class', 'params'),
    'shortcode' => array(
        'name' => 'grid',
        'template' => 'partials/frontend'
    )
);

return $config;
