<?php

/**
 * The header for our theme with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-background text-onSurface antialiased'); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site min-h-screen flex flex-col">
        <a class="skip-link sr-only focus:not-sr-only" href="#main">
            <?php esc_html_e('Skip to content', 'tika-tone'); ?>
        </a>

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
                        'walker' => new class extends Walker_Nav_Menu {
                            public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
                            {
                                $classes = empty($item->classes) ? [] : (array) $item->classes;
                                $is_active = in_array('current-menu-item', $classes) || in_array('current-page-ancestor', $classes);

                                $output .= sprintf(
                                    '<a href="%s" class="%s px-4 py-2 border-b-2 transition-colors %s" %s>%s</a>',
                                    esc_url($item->url),
                                    $is_active
                                        ? 'text-primary border-primary bg-primaryContainer font-medium'
                                        : 'text-onSurface hover:text-primary border-transparent hover:border-primary',
                                    $depth > 0 ? 'text-sm' : '',
                                    $item->target ? 'target="' . esc_attr($item->target) . '"' : '',
                                    esc_html($item->title)
                                );
                            }
                        }
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
                                'walker' => new class extends Walker_Nav_Menu {
                                    public function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
                                    {
                                        $classes = empty($item->classes) ? [] : (array) $item->classes;
                                        $is_active = in_array('current-menu-item', $classes);

                                        $output .= sprintf(
                                            '<a href="%s" class="%s px-4 py-3 border-l-4 transition-colors rounded-r-lg %s" %s>%s</a>',
                                            esc_url($item->url),
                                            $is_active
                                                ? 'text-primary border-primary bg-primaryContainer font-medium'
                                                : 'text-onSurfaceVariant hover:text-primary border-transparent hover:border-primary hover:bg-surfaceContainerLow',
                                            $depth > 0 ? 'text-sm pl-8' : '',
                                            $item->target ? 'target="' . esc_attr($item->target) . '"' : '',
                                            esc_html($item->title)
                                        );
                                    }
                                }
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
                <?php get_search_form(); ?>
            </div>
        </dialog>