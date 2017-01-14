<div class="hidden"><?php wp_editor('', 'hidden_editor'); ?></div>

<script type="text/javascript">
jQuery(document).ready(function(e) {
	if(typeof( editorSettings ) == 'undefined') {
		editorSettings = JSON.stringify(tinyMCEPreInit);
	}
});
</script>
