<?php

/**
 * The sidebar containing the main widget area with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_active_sidebar('sidebar-1')) {
    return;
}
?>

<aside id="secondary" class="widget-area" role="complementary">
    <wc-stack max-items="3" class="space-y-6">
        <?php dynamic_sidebar('sidebar-1'); ?>
    </wc-stack>
</aside>