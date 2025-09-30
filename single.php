<?php

/**
 * The template for displaying all single posts with Lit components
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

                <!-- Featured Image with Overlay -->
                <?php if (has_post_thumbnail()) : ?>
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
                        <?php if (!has_post_thumbnail()) : ?>
                            <?php the_title('<h1 class="entry-title text-3xl md:text-4xl font-bold text-onSurface mb-4">', '</h1>'); ?>

                            <div class="entry-meta flex flex-wrap items-center gap-4 text-onSurfaceVariant text-sm mb-4">
                                <span class="flex items-center gap-1">
                                    <span class="icon-[carbon--user] w-4 h-4"></span>
                                    <?php the_author(); ?>
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="icon-[carbon--calendar] w-4 h-4"></span>
                                    <?php echo esc_html(get_the_date()); ?>
                                </span>
                                <span class="flex items-center gap-1">
                                    <span class="icon-[carbon--time] w-4 h-4"></span>
                                    <?php echo \TikaToneTheme\Helpers\TemplateHelpers::reading_time_minutes(); ?> min read
                                </span>
                            </div>
                        <?php endif; ?>

                        <!-- Categories -->
                        <?php if (has_category()) : ?>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <?php
                                foreach (get_the_category() as $category) {
                                    printf(
                                        '<a href="%s" class="px-3 py-1 bg-primaryContainer text-onPrimaryContainer text-sm rounded-full hover:bg-primary hover:text-onPrimary transition-colors">%s</a>',
                                        esc_url(get_category_link($category)),
                                        esc_html($category->name)
                                    );
                                }
                                ?>
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
                        <!-- Tags -->
                        <?php if (has_tag()) : ?>
                            <div class="mb-6">
                                <h3 class="text-sm font-medium text-onSurfaceVariant mb-2"><?php esc_html_e('Tags:', 'tika-tone'); ?></h3>
                                <div class="flex flex-wrap gap-2">
                                    <?php
                                    the_tags('', '', '');
                                    ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Post Navigation -->
                        <wc-grille desktop="2" mobile="1" gap="medium" class="mt-6">
                            <?php
                            $prev_post = get_previous_post();
                            $next_post = get_next_post();
                            ?>

                            <?php if ($prev_post) : ?>
                                <wc-grille-item>
                                    <a href="<?php echo esc_url(get_permalink($prev_post)); ?>"
                                        class="group p-4 bg-surfaceContainerLow rounded-lg hover:bg-surfaceContainerHigh transition-colors block">
                                        <div class="text-sm text-onSurfaceVariant mb-1"><?php esc_html_e('Previous', 'tika-tone'); ?></div>
                                        <div class="font-medium text-onSurface group-hover:text-primary transition-colors">
                                            <?php echo esc_html($prev_post->post_title); ?>
                                        </div>
                                    </a>
                                </wc-grille-item>
                            <?php endif; ?>

                            <?php if ($next_post) : ?>
                                <wc-grille-item>
                                    <a href="<?php echo esc_url(get_permalink($next_post)); ?>"
                                        class="group p-4 bg-surfaceContainerLow rounded-lg hover:bg-surfaceContainerHigh transition-colors block text-right">
                                        <div class="text-sm text-onSurfaceVariant mb-1"><?php esc_html_e('Next', 'tika-tone'); ?></div>
                                        <div class="font-medium text-onSurface group-hover:text-primary transition-colors">
                                            <?php echo esc_html($next_post->post_title); ?>
                                        </div>
                                    </a>
                                </wc-grille-item>
                            <?php endif; ?>
                        </wc-grille>
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
