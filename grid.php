<?php

class Grid
{
    static $shortcodes;

    protected $config;

    protected $namespace;

    protected $postType;

    protected $playground;

    function __construct($config)
    {
        $this->config = $config;

        $this->playground = $this->config['playground'];
        $this->namespace = $this->config['namespace'];
        $this->postType = $this->config['post_type']['name'];
        $this->_setupActions();
    }

    private function _setupActions()
    {
        add_action('admin_enqueue_scripts', array($this, 'adminEnqueue'));
        add_action('init', array($this, 'addPostType'));
        add_action('add_meta_boxes', array($this, 'addMetaboxes'));
        add_action('save_post', array($this, 'saveGridData'));
        add_action('wp_ajax_get_shortcode', array($this, 'getShortcodeFields'));
    }

    private function _getJsLocalization()
    {
        $jsLocalization = $this->config['js_localization'];

        $localization = [];

        foreach ($jsLocalization as $key => $string) {
            $localization[$key] = __($string, $this->namespace);
        }

        return $localization;
    }

    private function get()
    {
        return self::$shortcodes;
    }

    public function map($shortcode)
    {
        self::$shortcodes[] = $shortcode;
    }

    public function getShortcodeFields()
    {
        extract($_GET);

        $shortcode = array_filter(self::$shortcodes, function($shortcode) use ($type){
            return $shortcode['base'] == $type ? true : false;
        });

        $shortcode = end($shortcode);

        ob_start();

        foreach ($shortcode['params'] as $param){

            $fieldParams = $this->config['field_params'];

            foreach ($fieldParams as $paramName) {
                $$paramName = (array_key_exists($paramName, $param)) ? $param[$paramName] : '';
            }

            $saved = (isset($args[$name])) ? $args[$name] : 'empty';

            if(!in_array($type, $this->config['field_types'])) return;

            include(plugin_dir_path( __FILE__ ) . 'partials/fields/' . $type . '.php');

        }

        $output = ob_get_clean();

        header("Content-type: application/json");
        echo json_encode($output);
        die;
    }

    public function saveGridData($postId)
    {
        $data = $this->playground['data'];

        $nonce = $_POST[$data.'_nonce'];

        if (!isset($nonce)) return $postId;

        if (!wp_verify_nonce($nonce, $data)) return $postId;

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return $postId;

        if($this->postType == $_POST['post_type'])
            if(!current_user_can('edit_page', $postId)) return $postId;
        else
            if(!current_user_can('edit_post', $postId)) return $postId;

        $gridData = $_POST[$data];

        update_post_meta($postId, $data, $gridData);
    }

    public function addPostType()
    {
        $label = __(ucfirst($this->postType), $this->namespace);

        register_post_type($this->postType,
            array(
                'labels' => array(
                    'name' => $label,
                    'singular_name' => $label
                ),
                'has_archive' => false,
                'menu_icon' => $this->config['post_type']['icon'],
                'public' => false,
                'show_ui' => true,
                'supports' => array('title')
            )
        );
    }

    public function addMetaboxes()
    {
        $metaboxes = $this->config['metaboxes'];

        foreach ($metaboxes as $name => $box) {
            $box_key = strtolower(str_replace(' ', '-', $name));
            add_meta_box($box_key, $name, function() use ($box){
                return include(plugin_dir_path( __FILE__ ) . $box['template'] . '.php');
            }, $this->postType, $box['position']);
        }
    }

    public function adminEnqueue()
    {
        wp_enqueue_media();

        wp_enqueue_style('wp-color-picker');
        wp_enqueue_style('jquery-ui-css', plugins_url('js/jquery-ui/jquery-ui.min.css', __FILE__ ));
        wp_enqueue_style('grid-builder-css', plugins_url('css/main.css',__FILE__ ));

        wp_enqueue_script('jquery-ui', plugins_url('js/jquery-ui/jquery-ui.min.js', __FILE__), array('jquery'), null, true);
        wp_enqueue_script('gridstack', plugins_url('js/gridstack/gridstack.all.js', __FILE__ ), array('jquery'), null, true);
        wp_enqueue_script('grid-builder-js', plugins_url('js/build.js',__FILE__ ), array('jquery', 'wp-color-picker'), null, true);

        wp_localize_script('grid-builder-js', 'wp', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'playground' => $this->playground,
            'strings' => $this->_getJsLocalization()
        ));
    }

}
