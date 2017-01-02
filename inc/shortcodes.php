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

    ?>
    <div class="grid-stack">
		<?php foreach($gridData as $block): ?>
			<div class="grid-stack-item"
				data-gs-x="<?php echo $block->x ?>"
				data-gs-y="<?php echo $block->y ?>"
				data-gs-width="<?php echo $block->width ?>"
				data-gs-height="<?php echo $block->height ?>"
				data-gs-id="<?php echo $block->id ?>">
		        <div class="grid-stack-item-content" <?php if(isset($block->src)) echo 'style="background-image: url('.$block->src.')"' ?>>
		        	<?php
					if($block->content) echo '<div class="widget-content">'.apply_filters('the_content', $block->content).'</div>';
					if(isset($block->nested)): ?>
						<div class="grid-stack">
						<?php foreach($block->nested as $block): ?>
							<div class="grid-stack-item"
								data-gs-x="<?php echo $block->x ?>"
								data-gs-y="<?php echo $block->y ?>"
								data-gs-width="<?php echo $block->width ?>"
								data-gs-height="<?php echo $block->height ?>"
								data-gs-id="<?php echo $block->id ?>">
								<div class="grid-stack-item-content" <?php if(isset($block->src)) echo 'style="background-image: url('.$block->src.')"' ?>>
									<?php if($block->content) echo '<div class="widget-content">'.apply_filters('the_content', $block->content).'</div>'; ?>
								</div>
							</div>
						<?php endforeach; ?>
						</div>
					<?php endif; ?>
		        </div>
		    </div>
		<?php endforeach; ?>
    </div>

    <?php

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
            'type' => 'textfield',
            'heading' => 'Content'
        )
    )
));

function shortcode_shortcode($atts){
    return 'this is bg shortcode';
}

add_shortcode('background', 'background_shortcode');

Grid::map(array(
    'name' => 'Background',
    'base' => 'background',
	'class' => 'background-shortcode',
    'params' => array(
        array(
            'name' => 'content',
            'type' => 'textfield',
            'heading' => 'Test'
        )
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
