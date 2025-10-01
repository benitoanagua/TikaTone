<?php

/**
 * The template for displaying archive pages with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main flex-grow">
    <div class="container mx-auto px-4 py-8">
        <header class="page-header mb-8 text-center">
            <wc-overlay
                title="<?php echo esc_attr(get_the_archive_title()); ?>"
                excerpt="<?php echo esc_attr(get_the_archive_description()); ?>"
                align="center"
                position="center"
                box="background"
                fill="gradient"
                class="mb-8 rounded-lg overflow-hidden">
            </wc-overlay>
        </header>

        <?php
        get_template_part('template-parts/content/posts-grid', null, [
            'empty_state_args' => [
                'message' => __('It seems we can\'t find what you\'re looking for in this archive.', 'tika-tone'),
                'show_home_link' => true
            ]
        ]);
        ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
