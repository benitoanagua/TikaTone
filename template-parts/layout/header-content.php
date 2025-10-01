<?php

/**
 * Template part for header content
 * 
 * @package TikaTone
 */

use TikaToneTheme\Helpers\TemplateHelpers;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Load menu walker if needed
if (!class_exists('TikaToneTheme\Navigation\MenuWalker')) {
    require_once get_template_directory() . '/inc/class-menu-walker.php';
}

use TikaToneTheme\Navigation\MenuWalker;
?>

<!-- Navbar Component -->
<wc-navbar class="sticky top-0 z-50 bg-surface shadow-sm">
    <!-- Logo slot -->
    <div slot="logo" class="flex items-center">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-2 no-underline">
            <wc-logo class="h-8 w-8 fill-primary"></wc-logo>
            <?php if (display_header_text()) : ?>
                <span class="text-xl font-bold text-onSurface hidden sm:block">
                    <?php bloginfo('name'); ?>
                </span>
            <?php endif; ?>
        </a>
    </div>

    <!-- Navigation slot -->
    <div slot="navigation">
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-1" aria-label="<?php esc_attr_e('Main Navigation', 'tika-tone'); ?>">
            <?php
            wp_nav_menu([
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'flex space-x-1',
                'fallback_cb' => false,
                'walker' => new MenuWalker('desktop')
            ]);
            ?>
        </nav>

        <!-- Mobile Offcanvas -->
        <wc-offcanvas position="left" class="md:hidden">
            <div class="p-6">
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-outlineVariant">
                    <h2 class="text-xl font-semibold text-onSurface">
                        <?php esc_html_e('Menu', 'tika-tone'); ?>
                    </h2>
                </div>
                <nav class="flex flex-col space-y-1" aria-label="<?php esc_attr_e('Mobile Navigation', 'tika-tone'); ?>">
                    <?php
                    wp_nav_menu([
                        'theme_location' => 'primary',
                        'container' => false,
                        'menu_class' => 'flex flex-col space-y-1',
                        'fallback_cb' => false,
                        'walker' => new MenuWalker('mobile')
                    ]);
                    ?>
                </nav>
            </div>
        </wc-offcanvas>
    </div>

    <!-- Actions slot -->
    <div slot="actions" class="flex items-center space-x-2">
        <!-- Search Toggle -->
        <button class="p-2 rounded-lg hover:bg-surfaceContainerLow transition-colors"
            onclick="document.getElementById('search-modal').showModal()"
            aria-label="<?php esc_attr_e('Search', 'tika-tone'); ?>">
            <span class="icon-[carbon--search] w-5 h-5 text-onSurfaceVariant"></span>
        </button>

        <!-- Theme Toggle -->
        <wc-theme-toggle></wc-theme-toggle>

        <!-- User Actions -->
        <?php if (is_user_logged_in()) : ?>
            <a href="<?php echo esc_url(wp_logout_url()); ?>"
                class="px-3 py-2 bg-error text-onError hover:bg-errorContainer hover:text-onErrorContainer transition-colors rounded-lg text-sm">
                <?php esc_html_e('Log Out', 'tika-tone'); ?>
            </a>
        <?php else : ?>
            <a href="<?php echo esc_url(wp_login_url()); ?>"
                class="px-3 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg text-sm">
                <?php esc_html_e('Log In', 'tika-tone'); ?>
            </a>
        <?php endif; ?>
    </div>
</wc-navbar>

<!-- Search Modal -->
<dialog id="search-modal" class="bg-surfaceContainerHigh backdrop:bg-black/50 rounded-lg shadow-xl max-w-2xl w-full mx-auto p-0">
    <div class="p-6 border-b border-outlineVariant">
        <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-onSurface"><?php esc_html_e('Search', 'tika-tone'); ?></h3>
            <button onclick="document.getElementById('search-modal').close()"
                class="p-1 hover:bg-surfaceContainerLow rounded">
                <span class="icon-[carbon--close] w-5 h-5 text-onSurfaceVariant"></span>
            </button>
        </div>
    </div>
    <div class="p-6">
        <?php echo TemplateHelpers::render_search_form(); ?>
    </div>
</dialog>