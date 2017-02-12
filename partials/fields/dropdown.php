<?php

if($value):

$assoc = (isAssoc($value)) ? true : false;

?>
<label for="<?php echo $name ?>"><?php echo $heading ?></label>

<select class="argument" id="<?php echo $name ?>" name="<?php echo $name ?>">
    <?php foreach($value as $key => $val):
        $selectVal = ($assoc) ? $key : $val;
        ?>
        <option value="<?php echo $selectVal ?>" <?php if($saved == $selectVal) echo "selected"; ?>><?php echo $val ?></option>
    <?php endforeach; ?>
</select>

<?php endif; ?>

<?php

function isAssoc(array $arr)
{
    if (array() === $arr) return false;
    return array_keys($arr) !== range(0, count($arr) - 1);
}

?>
