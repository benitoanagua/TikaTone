<?php
/**
 * The main template file
 *
 * @package Tika Tone
 */

get_header(); ?>

<main id="main" class="site-main">
    <div class="container mx-auto px-4 py-8">
        <?php if (have_posts()) : ?>
            <div class="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php while (have_posts()) : the_post(); ?>
                    <?php get_template_part('template-parts/content/content', get_post_type()); ?>
                <?php endwhile; ?>
            </div>
            
            <?php get_template_part('template-parts/navigation/pagination'); ?>
            
        <?php else : ?>
            <?php get_template_part('template-parts/content/content', 'none'); ?>
        <?php endif; ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
