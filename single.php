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
            <?php get_template_part('template-parts/content/single-post'); ?>
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
