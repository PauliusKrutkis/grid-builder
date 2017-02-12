<label for="<?php echo $name ?>"><?php echo $heading ?></label>
<input type="text"
    id="<?php echo $name ?>"
    class="argument"
    placeholder="<?php echo $placeholder ?>"
    value="<?php echo ($saved != 'empty') ? $saved : $value ?>"
    name="<?php echo $name ?>" />
