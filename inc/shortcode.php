<?php

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
