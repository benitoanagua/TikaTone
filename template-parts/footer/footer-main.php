<?php

/**
 * The footer template part
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<footer id="colophon" class="site-footer" role="contentinfo">
    <div class="footer-container">
        <div class="footer-widgets">
            <div class="footer-widgets-container">
                <?php if (is_active_sidebar('footer-1')) : ?>
                    <div class="footer-widget-area">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-2')) : ?>
                    <div class="footer-widget-area">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-3')) : ?>
                    <div class="footer-widget-area">
                        <?php dynamic_sidebar('footer-3'); ?>
                    </div>
                <?php endif; ?>

                <?php if (is_active_sidebar('footer-4')) : ?>
                    <div class="footer-widget-area">
                        <?php dynamic_sidebar('footer-4'); ?>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="footer-bottom-container">
                <div class="site-info">
                    <?php
                    $footer_text = sprintf(
                        /* translators: 1: Current year, 2: Site name */
                        esc_html__('&copy; %1$s %2$s. All rights reserved.', 'tika-tone'),
                        date_i18n('Y'),
                        get_bloginfo('name')
                    );
                    echo apply_filters('tika_tone_footer_text', $footer_text);
                    ?>

                    <?php
                    $theme_author = sprintf(
                        /* translators: %s: Theme author name */
                        esc_html__('Theme: Tika Tone by %s', 'tika-tone'),
                        '<a href="' . esc_url('https://benitoanagua.me') . '" rel="designer">Benito Anagua</a>'
                    );
                    ?>
                    <span class="theme-credit"><?php echo $theme_author; ?></span>
                </div>

                <nav class="footer-navigation" aria-label="<?php esc_attr_e('Footer Navigation', 'tika-tone'); ?>">
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location'  => 'footer-menu',
                            'menu_id'         => 'footer-menu',
                            'menu_class'      => 'footer-menu',
                            'container_class' => 'footer-menu-container',
                            'depth'           => 1,
                            'fallback_cb'     => false,
                        )
                    );
                    ?>
                </nav>

                <div class="social-links">
                    <?php
                    $social_links = apply_filters('tika_tone_social_links', array());
                    if (!empty($social_links)) :
                    ?>
                        <ul class="social-links-list">
                            <?php foreach ($social_links as $platform => $url) : ?>
                                <li>
                                    <a href="<?php echo esc_url($url); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr(ucfirst($platform)); ?>">
                                        <span class="social-icon <?php echo esc_attr($platform); ?>"></span>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</footer>