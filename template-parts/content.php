<?php

/**
 * Template part for displaying posts
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('content-item'); ?>>
    <header class="entry-header">
        <?php
        if (is_singular()) :
            the_title('<h1 class="entry-title">', '</h1>');
        else :
            the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
        endif;

        if ('post' === get_post_type()) :
        ?>
            <div class="entry-meta">
                <?php
                \TikaToneTheme\Helpers\TemplateHelpers::posted_on();
                \TikaToneTheme\Helpers\TemplateHelpers::posted_by();
                ?>
            </div>
        <?php endif; ?>
    </header>

    <?php
    if (has_post_thumbnail() && !is_singular()) :
    ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
                <?php
                the_post_thumbnail(
                    'post-thumbnail',
                    array(
                        'alt' => the_title_attribute(
                            array(
                                'echo' => false,
                            )
                        ),
                    )
                );
                ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="entry-content">
        <?php
        if (is_singular()) :
            the_content(
                sprintf(
                    wp_kses(
                        /* translators: %s: Name of current post. Only visible to screen readers */
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'tika-tone'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post(get_the_title())
                )
            );

            wp_link_pages(
                array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'tika-tone'),
                    'after'  => '</div>',
                )
            );
        else :
            the_excerpt();
        ?>
            <div class="read-more">
                <a href="<?php the_permalink(); ?>" class="read-more-link">
                    <?php esc_html_e('Read More', 'tika-tone'); ?>
                    <span class="screen-reader-text"><?php the_title(); ?></span>
                </a>
            </div>
        <?php endif; ?>
    </div>

    <footer class="entry-footer">
        <?php \TikaToneTheme\Helpers\TemplateHelpers::entry_footer(); ?>
    </footer>
</article>