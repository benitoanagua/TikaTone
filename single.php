<?php

/**
 * The template for displaying all single posts
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        get_template_part('template-parts/content', 'single');
    endwhile;
    ?>
</main>

<?php
get_sidebar();
get_footer();
