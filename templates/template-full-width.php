<?php

/**
 * Template Name: Full Width
 * Template Post Type: post, page
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main full-width-template">
    <div class="container-full">
        <?php
        while (have_posts()) :
            the_post();
        ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class('full-width-content'); ?>>
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
                    <?php \TikaToneTheme\Helpers\TemplateHelpers::entry_footer(); ?>
                </footer>
            </article>

        <?php
            // If comments are open or we have at least one comment, load up the comment template.
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;

        endwhile;
        ?>
    </div>
</main>

<?php
get_footer();
