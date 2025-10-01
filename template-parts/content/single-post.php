<?php

/**
 * Template part for displaying single posts
 * 
 * @package TikaTone
 */

use TikaToneTheme\Helpers\TemplateHelpers;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$args = wp_parse_args($args, [
    'show_featured_image' => true,
    'show_comments' => true,
    'show_navigation' => true
]);
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('bg-surfaceContainerHigh rounded-lg shadow-sm border border-outlineVariant overflow-hidden'); ?>>

    <!-- Featured Image with Overlay -->
    <?php if ($args['show_featured_image'] && has_post_thumbnail()) : ?>
        <wc-overlay
            title="<?php echo esc_attr(get_the_title()); ?>"
            feature-image="<?php echo esc_attr(get_the_post_thumbnail_url(null, 'full')); ?>"
            tag-name="<?php echo esc_attr(get_the_category_list(', ')); ?>"
            author-name="<?php echo esc_attr(get_the_author()); ?>"
            published-at="<?php echo esc_attr(get_the_date()); ?>"
            reading-time="<?php echo esc_attr(\TikaToneTheme\Helpers\TemplateHelpers::reading_time_minutes() . ' min read'); ?>"
            align="start"
            position="end"
            box="transparent"
            fill="gradient"
            class="mb-6"></wc-overlay>
    <?php endif; ?>

    <div class="p-6 md:p-8">
        <!-- Header -->
        <header class="entry-header mb-6">
            <?php if (!$args['show_featured_image'] || !has_post_thumbnail()) : ?>
                <?php the_title('<h1 class="entry-title text-3xl md:text-4xl font-bold text-onSurface mb-4">', '</h1>'); ?>
                <?php echo TemplateHelpers::render_post_meta(); ?>
            <?php endif; ?>

            <?php if (get_the_excerpt()) : ?>
                <div class="entry-summary text-lg text-onSurfaceVariant max-w-2xl">
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
        <footer class="entry-footer mt-8 pt-6 border-t border-outlineVariant">
            <?php echo TemplateHelpers::render_tags(); ?>

            <?php if ($args['show_navigation']) : ?>
                <?php echo TemplateHelpers::render_post_navigation(); ?>
            <?php endif; ?>

            <!-- Edit link -->
            <div class="text-center text-onSurfaceVariant text-sm mt-6">
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
            </div>
        </footer>
    </div>
</article>

<?php if ($args['show_comments']) : ?>
    <div class="mt-8">
        <?php echo TemplateHelpers::render_comments(); ?>
    </div>
<?php endif; ?>