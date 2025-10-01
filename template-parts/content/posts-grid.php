<?php

/**
 * Template part for displaying posts grid with pagination and empty states
 * 
 * @package TikaTone
 */

use TikaToneTheme\Helpers\TemplateHelpers;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

$args = wp_parse_args($args, [
    'query' => null,
    'columns_desktop' => 2,
    'columns_mobile' => 1,
    'empty_state_args' => []
]);

// Render posts grid
echo TemplateHelpers::render_posts_grid(
    $args['query'],
    $args['columns_desktop'],
    $args['columns_mobile']
);

// Render pagination if we have posts
if (($args['query'] ?: $GLOBALS['wp_query'])->have_posts()) {
    echo TemplateHelpers::render_pagination();
} else {
    // Render empty state
    echo TemplateHelpers::render_empty_state($args['empty_state_args']);
}
