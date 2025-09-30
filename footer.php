<?php

/**
 * The footer for our theme with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

</div><!-- #page -->

<footer class="site-footer bg-surfaceContainerHigh border-t border-outlineVariant mt-auto">
    <div class="container mx-auto px-4 py-8">
        <wc-grille desktop="4" mobile="1" gap="large" class="mb-6">
            <?php if (is_active_sidebar('footer-1')) : ?>
                <wc-grille-item>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-1'); ?>
                    </div>
                </wc-grille-item>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-2')) : ?>
                <wc-grille-item>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-2'); ?>
                    </div>
                </wc-grille-item>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-3')) : ?>
                <wc-grille-item>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-3'); ?>
                    </div>
                </wc-grille-item>
            <?php endif; ?>

            <?php if (is_active_sidebar('footer-4')) : ?>
                <wc-grille-item>
                    <div class="footer-widget">
                        <?php dynamic_sidebar('footer-4'); ?>
                    </div>
                </wc-grille-item>
            <?php endif; ?>
        </wc-grille>

        <div class="footer-bottom border-t border-outlineVariant pt-6">
            <wc-grille desktop="2" mobile="1" gap="medium" class="items-center">
                <wc-grille-item>
                    <div class="site-info text-onSurfaceVariant text-sm">
                        &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>.
                        <?php esc_html_e('All rights reserved.', 'tika-tone'); ?>
                    </div>
                </wc-grille-item>

                <wc-grille-item>
                    <div class="footer-navigation text-right">
                        <?php
                        wp_nav_menu([
                            'theme_location' => 'footer',
                            'container' => 'nav',
                            'container_class' => 'footer-menu',
                            'menu_class' => 'flex flex-wrap justify-end gap-4 text-sm',
                            'fallback_cb' => false,
                        ]);
                        ?>
                    </div>
                </wc-grille-item>
            </wc-grille>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>

</html>