<?php
/**
 * The template for displaying all single posts
 *
 * @package Tika Tone
 */

get_header();
?>

<main id="main" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('template-parts/content/content', 'single'); ?>
            
            <?php
            // Navegación entre posts
            the_post_navigation([
                'prev_text' => '<span class="nav-subtitle">' . esc_html__('Previous:', 'tika-tone') . '</span> <span class="nav-title">%title</span>',
                'next_text' => '<span class="nav-subtitle">' . esc_html__('Next:', 'tika-tone') . '</span> <span class="nav-title">%title</span>',
            ]);
            ?>

            <?php
            // Comentarios
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>

        <?php endwhile; ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
