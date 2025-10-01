<?php

/**
 * Tika Tone Theme functions and definitions
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Composer autoload
if (file_exists(get_template_directory() . '/vendor/autoload.php')) {
    require_once get_template_directory() . '/vendor/autoload.php';
}

// Theme constants
define('TIKA_TONE_THEME_VERSION', '1.0.0');
define('TIKA_TONE_THEME_PATH', get_template_directory());
define('TIKA_TONE_THEME_URL', get_template_directory_uri());

// Load template helpers
require_once TIKA_TONE_THEME_PATH . '/inc/template-helpers.php';

// Initialize the theme
add_action('after_setup_theme', function () {
    \TikaToneTheme\Theme::init();
});
