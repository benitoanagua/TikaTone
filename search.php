<?php

/**
 * The template for displaying search results with Lit components
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
            <wc-card
                title="<?php printf(esc_html__('Search Results for: %s', 'tika-tone'), '<span class="text-primary">' . get_search_query() . '</span>'); ?>"
                media-align="top"
                class="max-w-2xl mx-auto">
                <div slot="actions" class="mt-4">
                    <?php get_search_form(); ?>
                </div>
            </wc-card>
        </header>

        <?php
        get_template_part('template-parts/content/posts-grid', null, [
            'empty_state_args' => [
                'message' => __('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'tika-tone'),
                'show_search' => true
            ]
        ]);
        ?>
    </div>
</main>

<?php
get_sidebar();
get_footer();
