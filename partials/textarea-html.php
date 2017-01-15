<?php
$editor_id =  'gb_mce';
// TODO: remove full-screen
wp_editor('', $editor_id, array('quicktags' => false));
?>

<script type="text/javascript">
var editorStr = editorSettings.replace(/hidden_editor/gi, '<?php echo $editor_id; ?>');
var editorJSON = JSON.parse(editorStr);
tinymce.execCommand('mceRemoveEditor', true, '<?php echo $editor_id; ?>');
tinymce.init(editorJSON.mceInit['<?php echo $editor_id; ?>']);
quicktags(editorJSON.qtInit['<?php echo $editor_id; ?>']);
</script>
