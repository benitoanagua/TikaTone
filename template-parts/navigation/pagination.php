<?php
/**
 * Template part for displaying pagination
 *
 * @package Tika Tone
 */

the_posts_pagination([
    'mid_size'  => 2,
    'prev_text' => __('&larr; Previous', 'tika-tone'),
    'next_text' => __('Next &rarr;', 'tika-tone'),
    'class'     => 'pagination flex justify-center space-x-2 mt-8',
]);
