<?php

// Shortcode to display the grid

function tetris_shortcode($atts){
	extract(shortcode_atts(array(
		'id' => 0,
	), $atts));

	if(!$id) return;

	$query = new WP_Query(array(
		'post_type' => 'tetris',
		'p' => $id,
		'post_per_page' => 1
	));

	ob_start();

	?>
		<?php while ( $query->have_posts() ) : $query->the_post(); ?>
			<?php $gridData = json_decode(get_post_meta(get_the_ID(), 'grid-data-key', true)); ?>
			<div class="tetris-module">
		        <div class="grid-stack">
					<?php foreach($gridData as $widget): ?>
						<div class="grid-stack-item"
							data-gs-x="<?php echo $widget->x ?>"
							data-gs-y="<?php echo $widget->y ?>"
							data-gs-width="<?php echo $widget->width ?>"
							data-gs-height="<?php echo $widget->height ?>"
							data-gs-id="<?php echo $widget->id ?>">
					        <div class="grid-stack-item-content" <?php if(isset($widget->src)) echo 'style="background-image: url('.$widget->src.')"' ?>>
					        	<?php
									if($widget->content) echo '<div class="widget-content">'.apply_filters('the_content', $widget->content).'</div>';
									if(isset($widget->childGrid)): ?>
										<div class="grid-stack">
										<?php foreach($widget->childGrid as $widget): ?>
											<div class="grid-stack-item"
												data-gs-x="<?php echo $widget->x ?>"
												data-gs-y="<?php echo $widget->y ?>"
												data-gs-width="<?php echo $widget->width ?>"
												data-gs-height="<?php echo $widget->height ?>"
												data-gs-id="<?php echo $widget->id ?>">
												<div class="grid-stack-item-content" <?php if(isset($widget->src)) echo 'style="background-image: url('.$widget->src.')"' ?>>
													<?php if($widget->content) echo '<div class="widget-content">'.apply_filters('the_content', $widget->content).'</div>'; ?>
												</div>
											</div>
										<?php endforeach; ?>
										</div>
									<?php endif; ?>
					        </div>
					    </div>
					<?php endforeach; ?>
		        </div>
		    </div>
		<?php endwhile; ?>
		<?php wp_reset_postdata(); ?>
	<?php

	return ob_get_clean();

}

add_shortcode('tetris', 'tetris_shortcode');
