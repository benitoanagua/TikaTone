<?php

/**
 * The template for displaying all pages with Lit components
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
            <?php
            get_template_part('template-parts/content/single-post', null, [
                'show_featured_image' => true,
                'show_comments' => comments_open() || get_comments_number(),
                'show_navigation' => false
            ]);
            ?>
        <?php endwhile; ?>
    </div>
</main>

<?php
get_footer();
