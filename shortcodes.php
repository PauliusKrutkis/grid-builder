<?php

$shortcodes = array(
    'text' => array(
        'name' => 'Text',
        'base' => 'text',
        'params' => array(
            array(
                'name' => 'name',
                'type' => 'textfield',
                'heading' => 'Name',
                'value' => 'testName',
                'placeholder' => 'test placeholder'
            ),
            array(
                'name' => 'surname',
                'type' => 'textfield',
                'heading' => 'Surname',
            ),
            array(
                'name' => 'background',
                'type' => 'colorpicker',
                'heading' => 'BG',
                'value' => '#000'
            ),
            array(
                'name' => 'bgimg',
                'type' => 'image',
                'heading' => 'something',
                'value' => 457
            ),
            array(
                'name' => 'content',
                'type' => 'dropdown',
                'heading' => 'Test',
                'value' => array(
                    1 => 'lorem',
                    2 => 'test',
                    3 => 'ipsum'
                )
            ),
        )
    ),
    'lorem' => array(
        'name' => 'Lorem',
        'base' => 'lorem',
        'class' => 'some-class',
        'params' => array(
            array(
                'name' => 'content',
                'type' => 'textarea-html',
                'heading' => 'Lorem'
            ),
        )
    ),
    'example' => array(
        'name' => 'Example',
        'base' => 'example',
        'params' => array(
            array(
                'name' => 'content',
                'type' => 'textarea-html',
                'heading' => 'Lorem'
            ),
        )
    )
);

return $shortcodes;
