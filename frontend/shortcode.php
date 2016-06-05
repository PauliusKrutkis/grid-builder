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
			<?php $gridData = get_post_meta(get_the_ID(), 'grid-data-key', true); ?>
			<div class="tetris-module">
		        <div class="grid-stack"></div>
		        <input type="hidden" class="saved-data" autocomplete="off" name="grid-data" value="<?php echo esc_attr($gridData); ?>"/>
		    </div>
		<?php endwhile; ?>
		<?php wp_reset_postdata(); ?>
	<?php

	return ob_get_clean();

}

add_shortcode( 'tetris', 'tetris_shortcode' );
