<?php

/**
 * Template part for displaying a message that posts cannot be found
 *
 * @package TikaTone
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}
?>

<section class="no-results not-found">
    <header class="page-header">
        <h1 class="page-title">
            <?php
            if (is_search()) :
                printf(
                    /* translators: %s: search query */
                    esc_html__('Nothing found for "%s"', 'tika-tone'),
                    '<span class="search-query">' . get_search_query() . '</span>'
                );
            else :
                esc_html_e('Nothing Found', 'tika-tone');
            endif;
            ?>
        </h1>
    </header>

    <div class="page-content">
        <?php
        if (is_search()) :
        ?>
            <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'tika-tone'); ?></p>
        <?php
            get_search_form();
        else :
        ?>
            <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'tika-tone'); ?></p>
        <?php
            get_search_form();
        endif;
        ?>
    </div>
</section>