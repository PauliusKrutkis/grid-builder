<?php

class Shortcode_Collection{
	static $shortcodes = array();

	public static function add_shortcode($new_shortcode){
		self::$shortcodes[] = $new_shortcode;
	}

	public static function get_shortcodes(){
		return self::$shortcodes;
	}
}
