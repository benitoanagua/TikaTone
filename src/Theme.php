<?php

/**
 * Main theme class
 *
 * @package TikaToneTheme
 */

namespace TikaToneTheme;

use TikaToneTheme\Shortcodes\ComponentShortcodes;

class Theme
{

    /**
     * Theme instance
     *
     * @var Theme
     */
    private static $instance;

    /**
     * Theme components
     *
     * @var array
     */
    private $components = [];

    /**
     * Get theme instance
     *
     * @return Theme
     */
    public static function init(): Theme
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Constructor
     */
    private function __construct()
    {
        $this->load_components();
        $this->register_hooks();
    }

    /**
     * Load theme components
     */
    private function load_components(): void
    {
        $this->components['setup'] = new Setup\ThemeSetup();
        $this->components['assets'] = new Setup\EnqueueAssets();
        $this->components['blocks'] = new Blocks\BlockRegistry();
        $this->components['customizer'] = new Customizer\Customizer();
        $this->components['shortcodes'] = new ComponentShortcodes();
    }

    /**
     * Register WordPress hooks
     */
    private function register_hooks(): void
    {
        add_action('after_setup_theme', [$this, 'setup_theme']);
        add_action('init', [$this, 'init_theme']);
    }

    /**
     * Setup theme features
     */
    public function setup_theme(): void
    {
        foreach ($this->components as $component) {
            if (method_exists($component, 'setup')) {
                $component->setup();
            }
        }
    }

    /**
     * Initialize theme components
     */
    public function init_theme(): void
    {
        foreach ($this->components as $component) {
            if (method_exists($component, 'init')) {
                $component->init();
            }
        }
    }
}
