<?php

class Shortcode_Manager
{
    protected $shortcodes;

    protected $directory;

    function __construct($shortcodes)
    {
        $this->shortcodes = $shortcodes;
        $this->directory = 'partials/shortcodes/';

        $this->_setupActions();
    }

    private function _setupActions()
    {
        foreach ($this->shortcodes as $key => $shortcode) {
            add_shortcode($shortcode['base'], array($this, $key.'Shortcode'));
        }
    }

    public function textShortcode($atts = null, $content)
    {
        ob_start();

        include(plugin_dir_path( __FILE__ ) . $this->directory . 'text.php');

        return ob_get_clean();
    }

    public function imageShortcode($atts, $content = null)
    {
        extract($atts);

        ob_start();

        include(plugin_dir_path( __FILE__ ) . $this->directory . 'image.php');

        return ob_get_clean();
    }
}
