<?php

namespace TikaToneTheme\Customizer;

class Customizer
{
    public function init(): void
    {
        add_action('customize_register', [$this, 'register_customizer_settings']);
    }

    public function register_customizer_settings(\WP_Customize_Manager $wp_customize): void
    {
        // Secciones y settings del Customizer
        $wp_customize->add_section(
            'tika_tone_theme_options',
            [
                'title'    => __('Tika Tone Options', 'tika-tone'),
                'priority' => 30,
            ]
        );

        // Agregar controles personalizados aquí
    }
}
