<?php

class Grid{
    static $shortcodes = array();

    public static function map($new_shortcode){
        self::$shortcodes[] = $new_shortcode;
    }

    public static function get(){
        return self::$shortcodes;
    }
}

function grid_shortcode($atts){
    extract(shortcode_atts(array(
        'id' => 0,
    ), $atts));

    if(!$id) return;
    $gridData = json_decode(get_post_meta($id, 'grid-data-key', true));
    ob_start();

    return ob_get_clean();
}

add_shortcode('grid', 'grid_shortcode');

function text_shortcode($atts){
    return 'this is text shortcode';
}

add_shortcode('text', 'text_shortcode');

Grid::map(array(
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
            // 'value' => array('lorem', 'test', 'ipsum')
            'value' => array(
                1 => 'lorem',
                2 => 'test',
                3 => 'ipsum'
            )
        ),
    )
));
Grid::map(array(
    'name' => 'Lorem',
    'base' => 'lorem',
    'params' => array(
        array(
            'name' => 'content',
            'type' => 'textarea_html',
            'heading' => 'Lorem'
        ),
    )
));

function get_shortcode()
{
    extract($_GET);

    $shortcode = array_filter(Grid::get(), function($shortcode) use ($type){
        return $shortcode['base'] == $type ? true : false;
    });

    $shortcode = end($shortcode);

    ob_start();

    foreach ($shortcode['params'] as $param){

        $possibleParams = ['name', 'type', 'heading', 'value', 'placeholder'];

        foreach ($possibleParams as $paramName) {
            $$paramName = (array_key_exists($paramName, $param)) ? $param[$paramName] : '';
        }

        $saved = (isset($args[$name])) ? $args[$name] : 'empty';

        switch ($type) {
            case 'textfield':
                include(plugin_dir_path( __FILE__ ) . '../partials/textfield.php');
            break;

            case 'textarea_html':
                include(plugin_dir_path( __FILE__ ) . '../partials/textarea-html.php');
            break;

            case 'dropdown':
                include(plugin_dir_path( __FILE__ ) . '../partials/dropdown.php');
            break;

            case 'colorpicker':
                include(plugin_dir_path( __FILE__ ) . '../partials/colorpicker.php');
            break;

            case 'image':
                include(plugin_dir_path( __FILE__ ) . '../partials/image.php');
            break;

            default:
                continue;
            break;
        }
    }

    $output = ob_get_clean();

    header("Content-type: application/json");
    echo json_encode($output);
    die;
}

add_action('wp_ajax_get_shortcode', 'get_shortcode');
