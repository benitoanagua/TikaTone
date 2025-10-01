<?php

/**
 * The main template file with Lit components
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
        <?php if (is_home() && !is_front_page()) : ?>
            <header class="page-header mb-8 text-center">
                <wc-overlay
                    title="<?php echo esc_attr(single_post_title('', false)); ?>"
                    feature-image="<?php echo esc_attr(get_header_image()); ?>"
                    align="center"
                    position="center"
                    box="background"
                    fill="gradient"
                    class="mb-8 rounded-lg overflow-hidden">
                </wc-overlay>
            </header>
        <?php endif; ?>

        <?php
        get_template_part('template-parts/content/posts-grid', null, [
            'empty_state_args' => [
                'message' => __('It seems we can\'t find what you\'re looking for. Perhaps searching can help.', 'tika-tone'),
                'show_search' => true
            ]
        ]);
        ?>
    </div>
</main>

<?php
get_footer();
