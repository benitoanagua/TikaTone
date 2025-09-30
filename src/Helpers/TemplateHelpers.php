<?php

/**
 * Template helper functions
 *
 * @package TikaToneTheme
 */

namespace TikaToneTheme\Helpers;

class TemplateHelpers
{

    /**
     * Get theme asset URL
     *
     * @param string $path Asset path relative to assets directory.
     * @return string
     */
    public static function asset_url(string $path): string
    {
        if (!defined('TIKA_TONE_THEME_URL')) {
            return '';
        }
        return TIKA_TONE_THEME_URL . '/assets/' . ltrim($path, '/');
    }

    /**
     * Check if we're in development mode
     *
     * @return bool
     */
    public static function is_development(): bool
    {
        return defined('WP_DEBUG') && WP_DEBUG;
    }

    /**
     * Get post excerpt with custom length
     *
     * @param int $length Excerpt length.
     * @param string $more More text.
     * @return string
     */
    public static function get_excerpt(int $length = 55, string $more = '...'): string
    {
        $excerpt = get_the_excerpt();

        if (strlen($excerpt) > $length) {
            $excerpt = substr($excerpt, 0, $length) . $more;
        }

        return $excerpt;
    }

    /**
     * Display the post date
     */
    public static function posted_on(): void
    {
        $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
        if (get_the_time('U') !== get_the_modified_time('U')) {
            $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
        }

        $time_string = sprintf(
            $time_string,
            esc_attr(get_the_date(DATE_W3C)),
            esc_html(get_the_date()),
            esc_attr(get_the_modified_date(DATE_W3C)),
            esc_html(get_the_modified_date())
        );

        $posted_on = sprintf(
            /* translators: %s: post date. */
            esc_html_x('Posted on %s', 'post date', 'tika-tone'),
            '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
        );

        echo '<span class="posted-on">' . $posted_on . '</span>';
    }

    /**
     * Display the post author
     */
    public static function posted_by(): void
    {
        $author_id = (int) get_the_author_meta('ID');

        $byline = sprintf(
            /* translators: %s: post author. */
            esc_html_x('by %s', 'post author', 'tika-tone'),
            '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url($author_id)) . '">' . esc_html(get_the_author()) . '</a></span>'
        );

        echo '<span class="byline"> ' . $byline . '</span>';
    }

    /**
     * Display the post footer meta
     */
    public static function entry_footer(): void
    {
        // Hide category and tag text for pages.
        if ('post' === get_post_type()) {
            /* translators: used between list items, there is a space after the comma */
            $categories_list = get_the_category_list(esc_html__(', ', 'tika-tone'));
            if ($categories_list) {
                /* translators: 1: list of categories. */
                printf('<span class="cat-links">' . esc_html__('Posted in %1$s', 'tika-tone') . '</span>', $categories_list);
            }

            /* translators: used between list items, there is a space after the comma */
            $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'tika-tone'));
            if ($tags_list) {
                /* translators: 1: list of tags. */
                printf('<span class="tags-links">' . esc_html__('Tagged %1$s', 'tika-tone') . '</span>', $tags_list);
            }
        }

        if (!is_single() && !post_password_required() && (comments_open() || get_comments_number())) {
            echo '<span class="comments-link">';
            comments_popup_link(
                sprintf(
                    wp_kses(
                        /* translators: %s: post title */
                        __('Leave a Comment<span class="screen-reader-text"> on %s</span>', 'tika-tone'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    wp_kses_post(get_the_title())
                )
            );
            echo '</span>';
        }

        edit_post_link(
            sprintf(
                wp_kses(
                    /* translators: %s: Name of current post. Only visible to screen readers */
                    __('Edit <span class="screen-reader-text">%s</span>', 'tika-tone'),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                wp_kses_post(get_the_title())
            ),
            '<span class="edit-link">',
            '</span>'
        );
    }

    /**
     * Display reading time estimate
     */
    public static function reading_time(): void
    {
        $content = get_post_field('post_content', get_the_ID());
        $word_count = str_word_count(strip_tags($content));
        $reading_time = ceil($word_count / 200); // 200 words per minute

        echo '<span class="reading-time">';
        printf(
            /* translators: %d: reading time in minutes */
            esc_html__('%d min read', 'tika-tone'),
            $reading_time
        );
        echo '</span>';
    }
}
