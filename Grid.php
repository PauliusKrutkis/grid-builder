<?php

class Grid
{
    static $shortcodes;
    protected $config;

    public function __construct($config)
    {
        $this->config = $config;
        $this->_setupActions();
    }

    public function map($shortcode)
    {
        self::$shortcodes[] = $shortcode;
    }

    public static function get()
    {
        return self::$shortcodes;
    }

    private function _setupActions()
    {
        add_action('admin_enqueue_scripts', array($this, 'adminEnqueue'));
        add_action('add_meta_boxes', array($this, 'addMetaboxes'));
    }

    public function addMetaboxes()
    {
        $metaboxes = $this->config['metaboxes'];

        foreach ($metaboxes as $name => $box) {
            $box_key = strtolower(str_replace(' ', '-', $name));
            add_meta_box($box_key, $name, function() use ($box){
                return include(plugin_dir_path( __FILE__ ) . $box['template']);
            }, 'grid', $box['position']);
        }
    }

    public function adminEnqueue()
    {
        wp_enqueue_media();
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_style('jquery-ui-css', '//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
        wp_enqueue_script('jquery-ui', '//code.jquery.com/ui/1.11.4/jquery-ui.min.js', array('jquery'), null, true);
        wp_enqueue_script('gridstack', plugins_url('/js/gridstack.all.js', __FILE__ ), array('jquery'), null, true);
        wp_enqueue_style('styles', plugins_url('/css/main.css',__FILE__ ));
        wp_enqueue_script('build', plugins_url('/js/build.js',__FILE__ ), array('jquery', 'wp-color-picker'), null, true);
        // TODO: editor_id store in config
        wp_localize_script('build', 'wp', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'editor_id' => 'gb_mce'
        ));
    }

}
