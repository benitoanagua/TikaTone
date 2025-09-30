<?php

namespace TikaToneTheme\Admin;

class Admin
{
    public function init(): void
    {
        add_action('admin_menu', [$this, 'add_theme_options']);
        add_action('admin_init', [$this, 'register_theme_settings']);
    }

    public function add_theme_options(): void
    {
        add_theme_page(
            __('Tika Tone Settings', 'tika-tone'),
            __('Tika Tone', 'tika-tone'),
            'manage_options',
            'tika-tone-settings',
            [$this, 'theme_options_page']
        );
    }

    public function theme_options_page(): void
    {
?>
        <div class="wrap">
            <h1><?php esc_html_e('Tika Tone Theme Settings', 'tika-tone'); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('tika_tone_options');
                do_settings_sections('tika-tone-settings');
                submit_button();
                ?>
            </form>
        </div>
<?php
    }

    public function register_theme_settings(): void
    {
        register_setting('tika_tone_options', 'tika_tone_options');

        add_settings_section(
            'tika_tone_main_section',
            __('Main Settings', 'tika-tone'),
            [$this, 'main_section_callback'],
            'tika-tone-settings'
        );
    }

    public function main_section_callback(): void
    {
        echo '<p>' . esc_html__('Configure your theme settings here.', 'tika-tone') . '</p>';
    }
}
