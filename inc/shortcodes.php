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
            'name' => 'content',
            'type' => 'textarea_html',
            'heading' => 'Content'
        ),
    )
));

function get_shortcode()
{
    $type = $_GET['type'];

    $shortcode = array_filter(Grid::get(), function($shortcode) use ($type){
        return $shortcode['base'] == $type ? true : false;
    });

    $shortcode = end($shortcode);

    ob_start();

    foreach ($shortcode['params'] as $param){
        echo '<label>'.$param['heading'].'</label>';
        $name = $param['name'];
        switch ($param['type']) {
            case 'textfield':
                include(plugin_dir_path( __FILE__ ) . '../partials/textfield.php');
                break;
            case 'textarea_html':
                include(plugin_dir_path( __FILE__ ) . '../partials/textarea-html.php');
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
