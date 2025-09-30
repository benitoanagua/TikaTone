<?php

/**
 * Header template with Navbar component
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<wc-navbar class="sticky top-0 z-50">
    <!-- Logo slot -->
    <div slot="logo">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center">
            <wc-logo class="h-8 fill-primary"></wc-logo>
            <?php if (display_header_text()) : ?>
                <span class="ml-2 text-xl font-bold text-onSurface">
                    <?php bloginfo('name'); ?>
                </span>
            <?php endif; ?>
        </a>
    </div>

    <!-- Navigation slot -->
    <div slot="navigation">
        <?php
        wp_nav_menu([
            'theme_location' => 'primary',
            'container' => 'nav',
            'container_class' => 'hidden md:flex space-x-1',
            'menu_class' => 'flex space-x-1',
            'fallback_cb' => false,
        ]);
        ?>

        <!-- Mobile menu -->
        <wc-offcanvas class="md:hidden">
            <div class="mobile-navigation-content">
                <h2 class="text-xl font-medium text-onSurface mb-4 border-b-2 border-outlineVariant pb-2">
                    <?php esc_html_e('Menu', 'tika-tone'); ?>
                </h2>
                <?php
                wp_nav_menu([
                    'theme_location' => 'primary',
                    'container' => 'nav',
                    'menu_class' => 'flex flex-col gap-0',
                    'fallback_cb' => false,
                ]);
                ?>
            </div>
        </wc-offcanvas>
    </div>

    <!-- Actions slot -->
    <div slot="actions" class="flex items-center space-x-1">
        <?php if (is_user_logged_in()) : ?>
            <a href="<?php echo esc_url(wp_logout_url()); ?>"
                class="px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors">
                <?php esc_html_e('Log Out', 'tika-tone'); ?>
            </a>
        <?php else : ?>
            <a href="<?php echo esc_url(wp_login_url()); ?>"
                class="px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors">
                <?php esc_html_e('Log In', 'tika-tone'); ?>
            </a>
        <?php endif; ?>

        <wc-theme-toggle></wc-theme-toggle>

        <button class="p-2 rounded-none hover:bg-surfaceContainerLow transition-colors"
            title="<?php esc_attr_e('Search', 'tika-tone'); ?>">
            <span class="icon-[carbon--search] w-5 h-5 text-onSurfaceVariant"></span>
        </button>
    </div>
</wc-navbar>