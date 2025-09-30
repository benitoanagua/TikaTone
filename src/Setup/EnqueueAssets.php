<?php

/**
 * Enqueue theme assets
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
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    /**
     * Enqueue scripts
     */
    public function enqueue_scripts(): void
    {
        if (!defined('TIKA_TONE_THEME_URL') || !defined('TIKA_TONE_THEME_VERSION')) {
            return;
        }

        wp_enqueue_script(
            'tika-tone-theme',
            TIKA_TONE_THEME_URL . '/assets/js/theme.js',
            [],
            TIKA_TONE_THEME_VERSION,
            true
        );

        // Localize script for AJAX
        wp_localize_script(
            'tika-tone-theme',
            'tikaTone',
            [
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'nonce'   => wp_create_nonce('tika_tone_nonce'),
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

        wp_enqueue_style(
            'tika-tone-style',
            get_stylesheet_uri(),
            [],
            TIKA_TONE_THEME_VERSION
        );

        wp_enqueue_style(
            'tika-tone-main',
            TIKA_TONE_THEME_URL . '/assets/css/style.css',
            [],
            TIKA_TONE_THEME_VERSION
        );
    }

    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets(): void
    {
        if (!defined('TIKA_TONE_THEME_URL') || !defined('TIKA_TONE_THEME_VERSION')) {
            return;
        }

        wp_enqueue_style(
            'tika-tone-admin',
            TIKA_TONE_THEME_URL . '/assets/css/admin.css',
            [],
            TIKA_TONE_THEME_VERSION
        );

        wp_enqueue_script(
            'tika-tone-admin',
            TIKA_TONE_THEME_URL . '/assets/js/admin.js',
            ['jquery'],
            TIKA_TONE_THEME_VERSION,
            true
        );
    }
}
