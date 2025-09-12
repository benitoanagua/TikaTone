    <footer id="colophon" class="site-footer bg-gray-900 text-white">
        <div class="container mx-auto px-4 py-8">
            <?php if (is_active_sidebar('sidebar-footer')) : ?>
                <div class="footer-widgets mb-8">
                    <?php dynamic_sidebar('sidebar-footer'); ?>
                </div>
            <?php endif; ?>
            
            <div class="footer-info text-center">
                <div class="site-info mb-4">
                    <a href="<?php echo esc_url(__('https://wordpress.org/')); ?>">
                        <?php printf(esc_html__('Proudly powered by %s', 'tika-tone'), 'WordPress'); ?>
                    </a>
                    <span class="sep"> | </span>
                    <?php printf(esc_html__('Theme: %1$s by %2$s.', 'tika-tone'), 'Tika Tone', '<a href="https://benitoanagua.me/">Benito Anagua</a>'); ?>
                </div>
                
                <?php if (has_nav_menu('footer')) : ?>
                    <nav class="footer-navigation">
                        <?php
                        wp_nav_menu([
                            'theme_location' => 'footer',
                            'menu_id'        => 'footer-menu',
                            'menu_class'     => 'flex justify-center space-x-6 text-sm',
                            'depth'          => 1,
                        ]);
                        ?>
                    </nav>
                <?php endif; ?>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
