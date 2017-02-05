<input type="text"
    name="<?php echo $name ?>"
    data-default-color="<?php echo $value ?>"
    value="<?php echo ($saved != 'empty') ? $saved : '' ?>"
    class="argument colorpicker" />
    
<script type="text/javascript">
    jQuery('.colorpicker').wpColorPicker()
</script>
