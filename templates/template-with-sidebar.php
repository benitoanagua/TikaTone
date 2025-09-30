<?php

/**
 * Template Name: With Sidebar
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

<div class="content-wrapper with-sidebar">
    <div class="container">
        <div class="content-area">
            <main id="main" class="site-main">
                <?php
                while (have_posts()) :
                    the_post();
                ?>

                    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                        <header class="entry-header">
                            <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
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
            </main>
        </div>

        <aside class="sidebar-area">
            <?php get_sidebar(); ?>
        </aside>
    </div>
</div>

<?php
get_footer();
