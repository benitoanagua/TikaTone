<?php
namespace TikaToneTheme\Customizer;

use WP_Customize_Manager;

class Customizer {
    public function __construct() {
        add_action('customize_register', [$this, 'registerCustomizerSettings']);
    }
    
    public function registerCustomizerSettings(WP_Customize_Manager $wp_customize): void {
        // Sección principal
        $wp_customize->add_section('tika-tone_theme_options', [
            'title'    => __('Opciones del Tema', 'tika-tone'),
            'priority' => 30,
        ]);
        
        // Configuración de color primario
        $wp_customize->add_setting('primary_color', [
            'default'           => '#3B82F6',
            'sanitize_callback' => 'sanitize_hex_color',
            'transport'         => 'postMessage',
        ]);
        
        $wp_customize->add_control(new WP_Customize_Color_Control(
            $wp_customize,
            'primary_color',
            [
                'label'    => __('Color Primario', 'tika-tone'),
                'section'  => 'tika-tone_theme_options',
                'settings' => 'primary_color',
            ]
        ));
        
        // Agregar más configuraciones según sea necesario
    }
}
