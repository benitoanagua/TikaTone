<?php
namespace TikaToneTheme\Setup;

class Theme {
    private static $instance = null;
    
    private function __construct() {
        $this->init();
    }
    
    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        
        return self::$instance;
    }
    
    private function init(): void {
        add_action('after_setup_theme', [$this, 'setupTheme']);
        add_action('init', [$this, 'registerPostTypes']);
        add_action('init', [$this, 'registerTaxonomies']);
    }
    
    public function setupTheme(): void {
        // Configuración del tema
        load_theme_textdomain('tika-tone', get_template_directory() . '/languages');
    }
    
    public function registerPostTypes(): void {
        // Registrar custom post types aquí
    }
    
    public function registerTaxonomies(): void {
        // Registrar taxonomías personalizadas aquí
    }
    
    public function getVersion(): string {
        return TIKA-TONE_VERSION;
    }
}
