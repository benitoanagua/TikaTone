<?php

/**
 * The header for our theme with Lit components
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class('bg-background text-onSurface antialiased'); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site min-h-screen flex flex-col">
        <a class="skip-link sr-only focus:not-sr-only" href="#main">
            <?php esc_html_e('Skip to content', 'tika-tone'); ?>
        </a>

        <?php get_template_part('template-parts/layout/header-content'); ?>