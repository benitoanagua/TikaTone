<?php

/**
 * Enqueue theme assets with ES module support
 *
 * @package TikaToneTheme
 */

namespace TikaToneTheme\Setup;

class EnqueueAssets
{
    /**
     * Initialize assets
     */
    public function init(): void
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_styles']);
        add_action('wp_head', [$this, 'add_module_scripts']);
    }

    /**
     * Add module scripts in head
     */
    public function add_module_scripts(): void
    {
        if (!defined('TIKA_TONE_THEME_URL')) {
            return;
        }

        echo '<script type="module">';
        echo 'import("' . esc_url(TIKA_TONE_THEME_URL . '/public/tika-tone-elements.es.js') . '")';
        echo '.then(() => console.log("TikaTone Elements loaded"))';
        echo '.catch(err => console.error("Error loading TikaTone Elements:", err));';
        echo '</script>';
    }

    /**
     * Enqueue scripts
     */
    public function enqueue_scripts(): void
    {
        if (!defined('TIKA_TONE_THEME_URL') || !defined('TIKA_TONE_THEME_VERSION')) {
            return;
        }



        // Localize script for AJAX
        wp_localize_script(
            'tika-tone-theme',
            'tikaTone',
            [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce'   => wp_create_nonce('tika_tone_nonce'),
                'theme'   => [
                    'mode' => get_theme_mod('theme_mode', 'light')
                ],
                'elementsLoaded' => false
            ]
        );
    }

    /**
     * Enqueue styles
     */
    public function enqueue_styles(): void
    {
        if (!defined('TIKA_TONE_THEME_URL') || !defined('TIKA_TONE_THEME_VERSION')) {
            return;
        }

        // Estilo principal del tema
        wp_enqueue_style(
            'tika-tone-style',
            get_stylesheet_uri(),
            [],
            TIKA_TONE_THEME_VERSION
        );

        // Estilos de los componentes Lit
        wp_enqueue_style(
            'tika-tone-components',
            TIKA_TONE_THEME_URL . '/public/tika-tone-elements.css',
            [],
            TIKA_TONE_THEME_VERSION
        );
    }
}
