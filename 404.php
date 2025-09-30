<?php

/**
 * The template for displaying 404 pages (not found) with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header();
?>

<main id="main" class="site-main flex-grow flex items-center justify-center">
    <div class="container mx-auto px-4 py-16 text-center">
        <wc-card
            title="<?php esc_attr_e('404 - Page Not Found', 'tika-tone'); ?>"
            excerpt="<?php esc_attr_e('Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'tika-tone'); ?>"
            media-align="top"
            class="max-w-2xl mx-auto">
            <div slot="feature-image" class="mb-6">
                <div class="w-32 h-32 mx-auto bg-primaryContainer rounded-full flex items-center justify-center">
                    <span class="icon-[carbon--search] w-16 h-16 text-onPrimaryContainer"></span>
                </div>
            </div>

            <div slot="actions" class="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="<?php echo esc_url(home_url('/')); ?>"
                    class="px-6 py-3 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg font-medium">
                    <?php esc_html_e('Return Home', 'tika-tone'); ?>
                </a>
                <button onclick="document.getElementById('search-modal').showModal()"
                    class="px-6 py-3 bg-surfaceContainerHigh text-onSurface hover:bg-surfaceContainerHighest transition-colors rounded-lg font-medium border border-outlineVariant">
                    <?php esc_html_e('Search Site', 'tika-tone'); ?>
                </button>
            </div>
        </wc-card>
    </div>
</main>

<?php
get_footer();
