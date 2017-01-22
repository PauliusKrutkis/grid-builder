<?php
$saved = ($saved != 'empty') ? $saved : $value;
$saved_image = wp_get_attachment_image_src($saved, 'full');
$image_is_saved = is_array($saved_image);
?>

<div class="image-input-container">
    <div class="image-container">
        <?php if ($image_is_saved): ?>
            <img src="<?php echo $saved_image[0] ?>" style="max-width:100%;" />
        <?php endif; ?>
    </div>
    <a href="#" class="select-image">Select</a>
    <a href="#" class="delete-image">Delete</a>
    <input type="text" class="argument" name="<?php echo $name ?>" value="<?php echo esc_attr($saved); ?>" />
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
        title: 'Select or Upload Media Of Your Chosen Persuasion',
        button: {
            text: 'Use this media'
        },
        multiple: false
    });

    frame.on('select', function(){

        var attachment = frame.state().get('selection').first().toJSON();

        // TODO: clean imgContainer first

        imgContainer.append('<img src="'+attachment.url+'" alt="" style="max-width:100%;"/>');

        imgIdInput.val(attachment.id);

        // Hide the add image link
        // addImgLink.addClass( 'hidden' );

        // Unhide the remove image link
        // delImgLink.removeClass( 'hidden' );
    });

    frame.open();
});

delImgLink.on('click', function(event){

    event.preventDefault();

    imgContainer.html('');

    // Un-hide the add image link
    // addImgLink.removeClass('hidden');

    // Hide the delete image link
    // delImgLink.addClass('hidden');

    // Delete the image id from the hidden input
    imgIdInput.val('');

});
</script>
