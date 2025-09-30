<?php

/**
 * The template for displaying search results with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main flex-grow">
    <div class="container mx-auto px-4 py-8">
        <header class="page-header mb-8 text-center">
            <wc-card
                title="<?php printf(esc_html__('Search Results for: %s', 'tika-tone'), '<span class="text-primary">' . get_search_query() . '</span>'); ?>"
                media-align="top"
                class="max-w-2xl mx-auto">
                <div slot="actions" class="mt-4">
                    <?php get_search_form(); ?>
                </div>
            </wc-card>
        </header>

        <?php if (have_posts()) : ?>
            <wc-grille desktop="2" mobile="1" gap="large" class="mb-8">
                <?php while (have_posts()) : the_post(); ?>
                    <wc-grille-item>
                        <wc-card
                            title="<?php echo esc_attr(get_the_title()); ?>"
                            url="<?php echo esc_url(get_permalink()); ?>"
                            excerpt="<?php echo esc_attr(wp_trim_words(get_the_excerpt(), 20)); ?>"
                            feature-image="<?php echo esc_attr(get_the_post_thumbnail_url(null, 'large')); ?>"
                            author-name="<?php echo esc_attr(get_the_author()); ?>"
                            published-at="<?php echo esc_attr(get_the_date()); ?>"
                            reading-time="<?php echo esc_attr(\TikaToneTheme\Helpers\TemplateHelpers::reading_time_minutes() . ' min read'); ?>"
                            media-align="top"
                            aspect-ratio="video"
                            auto-layout
                            class="h-full"></wc-card>
                    </wc-grille-item>
                <?php endwhile; ?>
            </wc-grille>

            <!-- Pagination -->
            <div class="flex justify-center mt-8">
                <?php
                the_posts_pagination([
                    'prev_text' => __('Previous', 'tika-tone'),
                    'next_text' => __('Next', 'tika-tone'),
                    'before_page_number' => '<span class="px-3 py-1 bg-surfaceContainerLow text-onSurfaceVariant rounded">',
                    'after_page_number' => '</span>',
                ]);
                ?>
            </div>

        <?php else : ?>
            <wc-card
                title="<?php esc_attr_e('Nothing Found', 'tika-tone'); ?>"
                excerpt="<?php esc_attr_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'tika-tone'); ?>"
                media-align="top"
                class="max-w-2xl mx-auto text-center">
                <div slot="actions" class="mt-4">
                    <?php get_search_form(); ?>
                </div>
            </wc-card>
        <?php endif; ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
