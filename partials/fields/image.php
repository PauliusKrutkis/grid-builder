<?php
$saved = ($saved != 'empty') ? $saved : $value;
$saved_image = wp_get_attachment_image_src($saved, 'full');
$image_is_saved = is_array($saved_image);
?>

<label for="<?php echo $name ?>"><?php echo $heading ?></label>

<div class="image-input-container">
    <div class="image-container">
        <?php if ($image_is_saved): ?>
            <img src="<?php echo $saved_image[0] ?>" />
        <?php endif; ?>
    </div>
    <a href="javascript:void(0);" class="select-image button">
        <?php _e('Select', $this->namespace) ?>
    </a>
    <a href="javascript:void(0);" class="delete-image button <?php if(!$image_is_saved) echo 'hidden' ?>">
        <?php _e('Delete', $this->namespace) ?>
    </a>
    <input type="hidden" class="argument" name="<?php echo $name ?>" value="<?php echo esc_attr($saved); ?>" />
</div>

<script type="text/javascript">

var frame,
container = jQuery('.image-input-container'),
addImgLink = container.find('.select-image'),
delImgLink = container.find( '.delete-image'),
imgContainer = container.find( '.image-container'),
imgIdInput = container.find('input[name="<?php echo $name; ?>"]');

addImgLink.on('click', function(event){
    event.preventDefault();

    if (frame){
        frame.open();
        return;
    }

    frame = wp.media({
        title: "<?php _e('Select or Upload Media Of Your Chosen Persuasion', $this->namespace); ?>",
        button: {
            text: "<?php _e('Use this media', $this->namespace) ?>"
        },
        multiple: false
    });

    frame.on('select', function(){
        var attachment = frame.state().get('selection').first().toJSON();
        imgContainer.empty()
        imgContainer.append('<img src="'+attachment.url+'"/>');
        imgIdInput.val(attachment.id);
        delImgLink.removeClass('hidden');
    });

    frame.open();
});

delImgLink.on('click', function(event){
    event.preventDefault();
    imgContainer.html('');
    delImgLink.addClass('hidden');
    imgIdInput.val('');
});

</script>
