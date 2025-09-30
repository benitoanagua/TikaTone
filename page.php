<?php

/**
 * The template for displaying all pages with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main flex-grow">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <?php while (have_posts()) : the_post(); ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class('bg-surfaceContainerHigh rounded-lg shadow-sm border border-outlineVariant overflow-hidden'); ?>>

                <!-- Hero Section with Overlay -->
                <?php if (has_post_thumbnail()) : ?>
                    <wc-overlay
                        title="<?php echo esc_attr(get_the_title()); ?>"
                        feature-image="<?php echo esc_attr(get_the_post_thumbnail_url(null, 'full')); ?>"
                        align="center"
                        position="center"
                        box="transparent"
                        fill="gradient"
                        class="mb-6"></wc-overlay>
                <?php endif; ?>

                <div class="p-6 md:p-8">
                    <!-- Header -->
                    <header class="entry-header mb-6 text-center">
                        <?php if (!has_post_thumbnail()) : ?>
                            <?php the_title('<h1 class="entry-title text-3xl md:text-4xl font-bold text-onSurface mb-4">', '</h1>'); ?>
                        <?php endif; ?>

                        <?php if (get_the_excerpt()) : ?>
                            <div class="entry-summary text-lg text-onSurfaceVariant max-w-2xl mx-auto">
                                <?php the_excerpt(); ?>
                            </div>
                        <?php endif; ?>
                    </header>

                    <!-- Content -->
                    <div class="entry-content prose prose-lg max-w-none text-onSurface">
                        <?php
                        the_content();

                        wp_link_pages([
                            'before' => '<nav class="page-links flex flex-wrap gap-2 mt-6 pt-6 border-t border-outlineVariant" aria-label="' . esc_attr__('Page navigation', 'tika-tone') . '">',
                            'after'  => '</nav>',
                            'pagelink' => '<span class="px-3 py-1 bg-surfaceContainerLow text-onSurfaceVariant rounded hover:bg-primary hover:text-onPrimary transition-colors">%</span>',
                        ]);
                        ?>
                    </div>

                    <!-- Footer -->
                    <footer class="entry-footer mt-8 pt-6 border-t border-outlineVariant text-center text-onSurfaceVariant text-sm">
                        <?php
                        edit_post_link(
                            sprintf(
                                wp_kses(
                                    __('Edit <span class="screen-reader-text">%s</span>', 'tika-tone'),
                                    ['span' => ['class' => []]]
                                ),
                                wp_kses_post(get_the_title())
                            ),
                            '<span class="edit-link">',
                            '</span>'
                        );
                        ?>
                    </footer>
                </div>
            </article>

            <!-- Comments -->
            <?php if (comments_open() || get_comments_number()) : ?>
                <div class="mt-8">
                    <?php comments_template(); ?>
                </div>
            <?php endif; ?>

        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
