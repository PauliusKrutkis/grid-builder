<?php

$config = array(
    'metaboxes' => array(
        'Grid' => array(
            'template' => 'partials/grid.php',
            'position' => 'normal'
        ),
        'Grid shortcode' => array(
            'template' => 'partials/grid-shortcode.php',
            'position' => 'side'
        )
    )
);

return $config;
