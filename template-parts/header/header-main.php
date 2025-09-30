<?php

/**
 * The header template part
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<header id="masthead" class="site-header" role="banner">
    <div class="header-container">
        <div class="site-branding">
            <?php
            if (has_custom_logo()) :
                the_custom_logo();
            else :
            ?>
                <div class="site-title-wrapper">
                    <h1 class="site-title">
                        <a href="<?php echo esc_url(home_url('/')); ?>" rel="home">
                            <?php bloginfo('name'); ?>
                        </a>
                    </h1>
                    <?php
                    $description = get_bloginfo('description', 'display');
                    if ($description || is_customize_preview()) :
                    ?>
                        <p class="site-description"><?php echo $description; ?></p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>

        <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e('Main Navigation', 'tika-tone'); ?>">
            <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                <span class="menu-toggle-icon">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </span>
                <span class="screen-reader-text"><?php esc_html_e('Primary Menu', 'tika-tone'); ?></span>
            </button>

            <?php
            wp_nav_menu(
                array(
                    'theme_location'  => 'menu-1',
                    'menu_id'         => 'primary-menu',
                    'menu_class'      => 'nav-menu',
                    'container_class' => 'primary-menu-container',
                    'fallback_cb'     => false,
                    'depth'           => 3,
                )
            );
            ?>
        </nav>

        <div class="header-actions">
            <?php if (function_exists('get_search_form')) : ?>
                <div class="header-search">
                    <button class="search-toggle" aria-expanded="false" aria-label="<?php esc_attr_e('Toggle Search', 'tika-tone'); ?>">
                        <span class="search-icon"></span>
                    </button>
                    <div class="search-form-container">
                        <?php get_search_form(); ?>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</header>

<div class="mobile-menu-overlay"></div>