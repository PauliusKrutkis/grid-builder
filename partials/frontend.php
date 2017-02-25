<?php $data = json_decode(get_post_meta($id, $this->playground['data'], true)); ?>

<?php if(!empty($data)): ?>

    <div class="grid-stack grid-builder">

    <?php foreach ($data as $block): ?>

        <div class="grid-stack-item"
            data-gs-x="<?php echo $block->x ?>"
            data-gs-y="<?php echo $block->y ?>"
            data-gs-width="<?php echo $block->width ?>"
            data-gs-height="<?php echo $block->height ?>">
            <div class="grid-stack-item-content">
                <?php
                if(isset($block->props->shortcode)){
                    $shortcodeArgs = '';

                    $shortcodeArgs = implode(' ', array_map(function($value, $param){
                        return $param.'="'.$value.'"';
                    }, (array)$block->props->shortcodeArgs, array_keys((array)$block->props->shortcodeArgs)));

                    $content = '['.$block->props->shortcode.' '.$shortcodeArgs.']';

                    if(isset($block->props->content)){
                        $content .= $block->props->content;
                        $content .= '[/'.$block->props->shortcode.']';

                    }
                    echo apply_filters('the_content', $content);
                }
                ?>
            </div>
        </div>

    <?php endforeach; ?>

    </div>

<?php endif; ?>
