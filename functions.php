<?php
/**
 * Tika Tone functions and definitions
 *
 * @package Tika Tone
 */

namespace TikaToneTheme;

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Definir constantes del tema
define('TIKA-TONE_VERSION', '1.0.0');
define('TIKA-TONE_THEME_DIR', get_template_directory());
define('TIKA-TONE_THEME_URL', get_template_directory_uri());

// Cargar Composer autoloader
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
}

// Inicializar el tema
add_action('after_setup_theme', function() {
    Setup\Theme::getInstance();
});

// Cargar archivos de configuración
require_once get_template_directory() . '/inc/customizer/customizer.php';
require_once get_template_directory() . '/inc/blocks/blocks.php';

/**
 * Cargar estilos y scripts del tema
 */
function tika-tone_enqueue_assets(): void {
    // CSS principal
    wp_enqueue_style(
        'tika-tone-styles',
        get_template_directory_uri() . '/public/css/main.css',
        [],
        TIKA-TONE_VERSION
    );
    
    // JavaScript principal
    wp_enqueue_script(
        'tika-tone-scripts',
        get_template_directory_uri() . '/public/js/main.js',
        ['wp-api-fetch'],
        TIKA-TONE_VERSION,
        true
    );
    
    // Localizar script
    wp_localize_script('tika-tone-scripts', 'tika-toneAjax', [
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('tika-tone_nonce'),
        'restUrl' => rest_url('wp/v2/'),
        'restNonce' => wp_create_nonce('wp_rest')
    ]);
    
    // Estilos para el editor
    add_theme_support('editor-styles');
    add_editor_style('public/css/editor.css');
}
add_action('wp_enqueue_scripts', 'TikaToneTheme\tika-tone_enqueue_assets');

/**
 * Cargar estilos del admin
 */
function tika-tone_admin_enqueue_assets(): void {
    wp_enqueue_style(
        'tika-tone-admin',
        get_template_directory_uri() . '/public/css/admin.css',
        [],
        TIKA-TONE_VERSION
    );
    
    wp_enqueue_script(
        'tika-tone-admin',
        get_template_directory_uri() . '/public/js/admin.js',
        ['wp-blocks', 'wp-element', 'wp-editor'],
        TIKA-TONE_VERSION,
        true
    );
}
add_action('admin_enqueue_scripts', 'TikaToneTheme\tika-tone_admin_enqueue_assets');

/**
 * Soporte para características del tema
 */
function tika-tone_theme_support(): void {
    // Soporte para imágenes destacadas
    add_theme_support('post-thumbnails');
    
    // Soporte para título dinámico
    add_theme_support('title-tag');
    
    // Soporte para HTML5
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ]);
    
    // Soporte para RSS
    add_theme_support('automatic-feed-links');
    
    // Soporte para logo personalizado
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    
    // Soporte para menús
    register_nav_menus([
        'primary' => __('Primary Menu', 'tika-tone'),
        'footer'  => __('Footer Menu', 'tika-tone'),
        'social'  => __('Social Menu', 'tika-tone'),
    ]);
    
    // Soporte para colores personalizados
    add_theme_support('custom-background');
    add_theme_support('custom-header');
    
    // Soporte para Gutenberg
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('responsive-embeds');
    
    // Soporte para colores del editor
    add_theme_support('editor-color-palette', [
        [
            'name'  => __('Primary', 'tika-tone'),
            'slug'  => 'primary',
            'color' => '#3B82F6',
        ],
        [
            'name'  => __('Secondary', 'tika-tone'),
            'slug'  => 'secondary',
            'color' => '#6B7280',
        ],
        [
            'name'  => __('Accent', 'tika-tone'),
            'slug'  => 'accent',
            'color' => '#F59E0B',
        ],
    ]);
    
    // Tamaños de imagen personalizados
    add_image_size('tika-tone-featured', 800, 450, true);
    add_image_size('tika-tone-thumbnail', 300, 200, true);
}
add_action('after_setup_theme', 'TikaToneTheme\tika-tone_theme_support');

/**
 * Registrar sidebars
 */
function tika-tone_register_sidebars(): void {
    register_sidebar([
        'name'          => __('Main Sidebar', 'tika-tone'),
        'id'            => 'sidebar-main',
        'description'   => __('Main sidebar widget area', 'tika-tone'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ]);
    
    register_sidebar([
        'name'          => __('Footer Sidebar', 'tika-tone'),
        'id'            => 'sidebar-footer',
        'description'   => __('Footer widget area', 'tika-tone'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ]);
}
add_action('widgets_init', 'TikaToneTheme\tika-tone_register_sidebars');
