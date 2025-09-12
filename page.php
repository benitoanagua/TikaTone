<?php
/**
 * The template for displaying all pages
 *
 * @package Tika Tone
 */

get_header();
?>

<main id="main" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php while (have_posts()) : the_post(); ?>
            <?php get_template_part('template-parts/content/content', 'page'); ?>
            
            <?php
            // Comentarios en páginas
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
