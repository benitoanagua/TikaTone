<?php

/**
 * Template for displaying search forms with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
    <div class="flex gap-2">
        <label class="sr-only"><?php echo esc_html_x('Search for:', 'label', 'tika-tone'); ?></label>
        <input type="search"
            class="search-field flex-grow px-4 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="<?php echo esc_attr_x('Search &hellip;', 'placeholder', 'tika-tone'); ?>"
            value="<?php echo get_search_query(); ?>"
            name="s" />
        <button type="submit"
            class="search-submit px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg font-medium">
            <span class="icon-[carbon--search] w-5 h-5"></span>
            <span class="sr-only"><?php echo esc_html_x('Search', 'submit button', 'tika-tone'); ?></span>
        </button>
    </div>
</form>