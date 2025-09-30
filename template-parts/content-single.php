<?php

/**
 * Template part for displaying single posts
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('single-post'); ?>>
    <header class="entry-header">
        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>

        <div class="entry-meta">
            <?php
            \TikaToneTheme\Helpers\TemplateHelpers::posted_on();
            \TikaToneTheme\Helpers\TemplateHelpers::posted_by();
            \TikaToneTheme\Helpers\TemplateHelpers::reading_time();
            ?>
        </div>

        <?php if (has_post_thumbnail()) : ?>
            <div class="featured-image">
                <?php
                the_post_thumbnail(
                    'full',
                    array(
                        'class' => 'post-thumbnail-single',
                        'alt'   => the_title_attribute(array('echo' => false)),
                    )
                );
                ?>
            </div>
        <?php endif; ?>
    </header>

    <div class="entry-content">
        <?php
        the_content();

        wp_link_pages(
            array(
                'before' => '<div class="page-links">' . esc_html__('Pages:', 'tika-tone'),
                'after'  => '</div>',
            )
        );
        ?>
    </div>

    <footer class="entry-footer">
        <div class="post-taxonomies">
            <?php
            // Categories
            $categories_list = get_the_category_list(esc_html__(', ', 'tika-tone'));
            if ($categories_list) :
            ?>
                <div class="cat-links">
                    <span class="taxonomy-label"><?php esc_html_e('Categories:', 'tika-tone'); ?></span>
                    <?php echo $categories_list; ?>
                </div>
            <?php endif; ?>

            <?php
            // Tags
            $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'tika-tone'));
            if ($tags_list) :
            ?>
                <div class="tags-links">
                    <span class="taxonomy-label"><?php esc_html_e('Tags:', 'tika-tone'); ?></span>
                    <?php echo $tags_list; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="post-navigation">
            <?php
            the_post_navigation(
                array(
                    'prev_text' => '<span class="nav-subtitle">' . esc_html__('Previous:', 'tika-tone') . '</span> <span class="nav-title">%title</span>',
                    'next_text' => '<span class="nav-subtitle">' . esc_html__('Next:', 'tika-tone') . '</span> <span class="nav-title">%title</span>',
                )
            );
            ?>
        </div>
    </footer>
</article>