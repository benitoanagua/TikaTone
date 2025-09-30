<?php

/**
 * Theme setup functionality
 *
 * @package TikaToneTheme
 */

namespace TikaToneTheme\Setup;

class ThemeSetup
{

    /**
     * Setup theme features
     */
    public function setup(): void
    {
        add_action('after_setup_theme', [$this, 'setup_theme_support']);
        add_action('after_setup_theme', [$this, 'load_textdomain']);
    }

    /**
     * Setup theme support
     */
    public function setup_theme_support(): void
    {
        // Automatic feed links
        add_theme_support('automatic-feed-links');

        // Title tag
        add_theme_support('title-tag');

        // Post thumbnails
        add_theme_support('post-thumbnails');

        // Custom logo
        add_theme_support(
            'custom-logo',
            [
                'height'      => 100,
                'width'       => 300,
                'flex-height' => true,
                'flex-width'  => true,
            ]
        );

        // HTML5 support
        add_theme_support(
            'html5',
            [
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            ]
        );

        // WordPress core block styles
        add_theme_support('wp-block-styles');

        // Wide alignment
        add_theme_support('align-wide');

        // Editor styles
        add_theme_support('editor-styles');
        add_editor_style('assets/css/editor.css');

        // Custom color palette
        add_theme_support(
            'editor-color-palette',
            [
                [
                    'name'  => esc_html__('Primary', 'tika-tone'),
                    'slug'  => 'primary',
                    'color' => '#007cba',
                ],
                // Add more colors...
            ]
        );
    }

    /**
     * Load text domain
     */
    public function load_textdomain(): void
    {
        load_theme_textdomain(
            'tika-tone',
            get_template_directory() . '/languages'
        );
    }
}
