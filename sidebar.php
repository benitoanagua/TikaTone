<?php
/**
 * The sidebar containing the main widget area
 *
 * @package Tika Tone
 */

if (!is_active_sidebar('sidebar-main')) {
    return;
}
?>

<aside id="secondary" class="widget-area sidebar">
    <div class="sidebar-content">
        <?php dynamic_sidebar('sidebar-main'); ?>
    </div>
</aside>
