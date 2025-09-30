<?php

/**
 * The template for displaying archive pages with Lit components
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
            <wc-overlay
                title="<?php echo esc_attr(get_the_archive_title()); ?>"
                excerpt="<?php echo esc_attr(get_the_archive_description()); ?>"
                align="center"
                position="center"
                box="background"
                fill="gradient"
                class="mb-8 rounded-lg overflow-hidden">
            </wc-overlay>
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
                <wc-grille desktop="3" mobile="1" gap="medium" class="w-full max-w-md">
                    <?php
                    $prev_link = get_previous_posts_link(__('Newer Posts', 'tika-tone'));
                    $next_link = get_next_posts_link(__('Older Posts', 'tika-tone'));
                    ?>
                    <?php if ($prev_link) : ?>
                        <wc-grille-item>
                            <div class="text-left">
                                <?php echo $prev_link; ?>
                            </div>
                        </wc-grille-item>
                    <?php endif; ?>

                    <wc-grille-item>
                        <div class="text-center text-onSurfaceVariant">
                            <?php
                            global $paged;
                            $current_page = max(1, $paged);
                            printf(__('Page %d of %d', 'tika-tone'), $current_page, $wp_query->max_num_pages);
                            ?>
                        </div>
                    </wc-grille-item>

                    <?php if ($next_link) : ?>
                        <wc-grille-item>
                            <div class="text-right">
                                <?php echo $next_link; ?>
                            </div>
                        </wc-grille-item>
                    <?php endif; ?>
                </wc-grille>
            </div>

        <?php else : ?>
            <wc-card
                title="<?php esc_attr_e('Nothing Found', 'tika-tone'); ?>"
                excerpt="<?php esc_attr_e('It seems we can&rsquo;t find what you&rsquo;re looking for in this archive.', 'tika-tone'); ?>"
                media-align="top"
                class="max-w-2xl mx-auto text-center">
                <div slot="actions" class="mt-4">
                    <a href="<?php echo esc_url(home_url('/')); ?>"
                        class="px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg">
                        <?php esc_html_e('Return Home', 'tika-tone'); ?>
                    </a>
                </div>
            </wc-card>
        <?php endif; ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
