<?php

/**
 * Template helper functions for TikaTone theme
 * 
 * @package TikaTone
 */

namespace TikaToneTheme\Helpers;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class TemplateHelpers
{

    /**
     * Render post card with consistent attributes
     */
    public static function render_post_card($args = [])
    {
        $defaults = [
            'post_id' => null,
            'media_align' => 'top',
            'aspect_ratio' => 'video',
            'auto_layout' => true,
            'class' => 'h-full'
        ];

        $args = wp_parse_args($args, $defaults);
        $post_id = $args['post_id'] ?: get_the_ID();

        $attrs = [
            'title' => esc_attr(get_the_title($post_id)),
            'url' => esc_url(get_permalink($post_id)),
            'excerpt' => esc_attr(wp_trim_words(get_the_excerpt($post_id), 20)),
            'feature-image' => esc_attr(get_the_post_thumbnail_url($post_id, 'large')),
            'author-name' => esc_attr(get_the_author_meta('display_name', get_post_field('post_author', $post_id))),
            'published-at' => esc_attr(get_the_date('', $post_id)),
            'reading-time' => esc_attr(self::reading_time_minutes($post_id) . ' min read'),
            'media-align' => $args['media_align'],
            'aspect-ratio' => $args['aspect_ratio'],
            'auto-layout' => $args['auto_layout'] ? 'true' : 'false',
            'class' => $args['class']
        ];

        $attributes_string = '';
        foreach ($attrs as $key => $value) {
            if (!empty($value)) {
                $attributes_string .= sprintf(' %s="%s"', $key, $value);
            }
        }

        return sprintf('<wc-card%s></wc-card>', $attributes_string);
    }

    /**
     * Render pagination with consistent styling
     */
    public static function render_pagination()
    {
        global $paged, $wp_query;

        $prev_link = get_previous_posts_link(__('Newer Posts', 'tika-tone'));
        $next_link = get_next_posts_link(__('Older Posts', 'tika-tone'));

        if (!$prev_link && !$next_link) {
            return '';
        }

        $current_page = max(1, $paged);

        ob_start();
?>
        <div class="flex justify-center mt-8">
            <wc-grille desktop="3" mobile="1" gap="medium" class="w-full max-w-md">
                <?php if ($prev_link) : ?>
                    <wc-grille-item>
                        <div class="text-left"><?php echo $prev_link; ?></div>
                    </wc-grille-item>
                <?php endif; ?>

                <wc-grille-item>
                    <div class="text-center text-onSurfaceVariant">
                        <?php printf(__('Page %d of %d', 'tika-tone'), $current_page, $wp_query->max_num_pages); ?>
                    </div>
                </wc-grille-item>

                <?php if ($next_link) : ?>
                    <wc-grille-item>
                        <div class="text-right"><?php echo $next_link; ?></div>
                    </wc-grille-item>
                <?php endif; ?>
            </wc-grille>
        </div>
    <?php
        return ob_get_clean();
    }

    /**
     * Render empty state card
     */
    public static function render_empty_state($args = [])
    {
        $defaults = [
            'title' => __('Nothing Found', 'tika-tone'),
            'message' => __('It seems we can\'t find what you\'re looking for.', 'tika-tone'),
            'show_search' => false,
            'show_home_link' => true,
        ];

        $args = wp_parse_args($args, $defaults);

        ob_start();
    ?>
        <wc-card
            title="<?php echo esc_attr($args['title']); ?>"
            excerpt="<?php echo esc_attr($args['message']); ?>"
            media-align="top"
            class="max-w-2xl mx-auto text-center">

            <div slot="actions" class="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <?php if ($args['show_home_link']) : ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>"
                        class="px-6 py-3 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg font-medium">
                        <?php esc_html_e('Return Home', 'tika-tone'); ?>
                    </a>
                <?php endif; ?>

                <?php if ($args['show_search']) : ?>
                    <?php get_search_form(); ?>
                <?php endif; ?>
            </div>
        </wc-card>
        <?php
        return ob_get_clean();
    }

    /**
     * Render posts grid with cards
     */
    public static function render_posts_grid($query = null, $columns_desktop = 2, $columns_mobile = 1)
    {
        $query = $query ?: $GLOBALS['wp_query'];

        ob_start();

        if ($query->have_posts()) : ?>
            <wc-grille desktop="<?php echo $columns_desktop; ?>" mobile="<?php echo $columns_mobile; ?>" gap="large" class="mb-8">
                <?php while ($query->have_posts()) : $query->the_post(); ?>
                    <wc-grille-item>
                        <?php echo self::render_post_card(); ?>
                    </wc-grille-item>
                <?php endwhile; ?>
            </wc-grille>
        <?php endif;

        wp_reset_postdata();
        return ob_get_clean();
    }

    /**
     * Get reading time in minutes
     */
    public static function reading_time_minutes($post_id = null)
    {
        $post_id = $post_id ?: get_the_ID();
        $content = get_post_field('post_content', $post_id);
        $word_count = str_word_count(strip_tags($content));
        $reading_time = ceil($word_count / 200);

        return max(1, $reading_time);
    }


    /**
     * Render comments section
     */
    public static function render_comments()
    {
        if (comments_open() || get_comments_number()) {
            ob_start();
            get_template_part('template-parts/content/comments');
            return ob_get_clean();
        }
        return '';
    }

    /**
     * Render post navigation (next/previous posts)
     */
    public static function render_post_navigation()
    {
        $prev_post = get_previous_post();
        $next_post = get_next_post();

        if (!$prev_post && !$next_post) {
            return '';
        }

        ob_start();
        ?>
        <wc-grille desktop="2" mobile="1" gap="medium" class="mt-6">
            <?php if ($prev_post) : ?>
                <wc-grille-item>
                    <a href="<?php echo esc_url(get_permalink($prev_post)); ?>"
                        class="group p-4 bg-surfaceContainerLow rounded-lg hover:bg-surfaceContainerHigh transition-colors block">
                        <div class="text-sm text-onSurfaceVariant mb-1"><?php esc_html_e('Previous', 'tika-tone'); ?></div>
                        <div class="font-medium text-onSurface group-hover:text-primary transition-colors">
                            <?php echo esc_html($prev_post->post_title); ?>
                        </div>
                    </a>
                </wc-grille-item>
            <?php endif; ?>

            <?php if ($next_post) : ?>
                <wc-grille-item>
                    <a href="<?php echo esc_url(get_permalink($next_post)); ?>"
                        class="group p-4 bg-surfaceContainerLow rounded-lg hover:bg-surfaceContainerHigh transition-colors block text-right">
                        <div class="text-sm text-onSurfaceVariant mb-1"><?php esc_html_e('Next', 'tika-tone'); ?></div>
                        <div class="font-medium text-onSurface group-hover:text-primary transition-colors">
                            <?php echo esc_html($next_post->post_title); ?>
                        </div>
                    </a>
                </wc-grille-item>
            <?php endif; ?>
        </wc-grille>
    <?php
        return ob_get_clean();
    }

    /**
     * Render post meta information
     */
    public static function render_post_meta($post_id = null, $include_categories = true)
    {
        $post_id = $post_id ?: get_the_ID();

        ob_start();
    ?>
        <div class="entry-meta flex flex-wrap items-center gap-4 text-onSurfaceVariant text-sm mb-4">
            <span class="flex items-center gap-1">
                <span class="icon-[carbon--user] w-4 h-4"></span>
                <?php the_author(); ?>
            </span>
            <span class="flex items-center gap-1">
                <span class="icon-[carbon--calendar] w-4 h-4"></span>
                <?php echo esc_html(get_the_date()); ?>
            </span>
            <span class="flex items-center gap-1">
                <span class="icon-[carbon--time] w-4 h-4"></span>
                <?php echo self::reading_time_minutes($post_id); ?> min read
            </span>
        </div>

        <?php if ($include_categories && has_category()) : ?>
            <div class="flex flex-wrap gap-2 mb-4">
                <?php
                foreach (get_the_category() as $category) {
                    printf(
                        '<a href="%s" class="px-3 py-1 bg-primaryContainer text-onPrimaryContainer text-sm rounded-full hover:bg-primary hover:text-onPrimary transition-colors">%s</a>',
                        esc_url(get_category_link($category)),
                        esc_html($category->name)
                    );
                }
                ?>
            </div>
        <?php endif;

        return ob_get_clean();
    }

    /**
     * Render tags list
     */
    public static function render_tags($post_id = null)
    {
        $post_id = $post_id ?: get_the_ID();

        if (!has_tag('', $post_id)) {
            return '';
        }

        ob_start();
        ?>
        <div class="mb-6">
            <h3 class="text-sm font-medium text-onSurfaceVariant mb-2"><?php esc_html_e('Tags:', 'tika-tone'); ?></h3>
            <div class="flex flex-wrap gap-2">
                <?php the_tags('', '', ''); ?>
            </div>
        </div>
    <?php
        return ob_get_clean();
    }

    /**
     * Render search form with consistent styling
     */
    public static function render_search_form($placeholder = '')
    {
        $placeholder = $placeholder ?: esc_attr_x('Search &hellip;', 'placeholder', 'tika-tone');

        ob_start();
    ?>
        <form role="search" method="get" class="search-form" action="<?php echo esc_url(home_url('/')); ?>">
            <div class="flex gap-2">
                <label class="sr-only"><?php echo esc_html_x('Search for:', 'label', 'tika-tone'); ?></label>
                <input type="search"
                    class="search-field flex-grow px-4 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="<?php echo $placeholder; ?>"
                    value="<?php echo get_search_query(); ?>"
                    name="s" />
                <button type="submit"
                    class="search-submit px-4 py-2 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg font-medium">
                    <span class="icon-[carbon--search] w-5 h-5"></span>
                    <span class="sr-only"><?php echo esc_html_x('Search', 'submit button', 'tika-tone'); ?></span>
                </button>
            </div>
        </form>
<?php
        return ob_get_clean();
    }
}
