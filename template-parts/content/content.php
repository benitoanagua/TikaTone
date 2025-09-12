<?php
/**
 * Template part for displaying posts
 *
 * @package Tika Tone
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg shadow-md overflow-hidden'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('tika-tone-featured', ['class' => 'w-full h-48 object-cover']); ?>
            </a>
        </div>
    <?php endif; ?>
    
    <div class="p-6">
        <header class="entry-header mb-4">
            <?php
            if (is_singular()) :
                the_title('<h1 class="entry-title text-3xl font-bold mb-2">', '</h1>');
            else :
                the_title('<h2 class="entry-title text-xl font-bold mb-2"><a href="' . esc_url(get_permalink()) . '" rel="bookmark">', '</a></h2>');
            endif;
            ?>
            
            <div class="entry-meta text-sm text-gray-600">
                <?php
                $byline = sprintf(
                    esc_html_x('by %s', 'post author', 'tika-tone'),
                    '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
                );
                
                echo '<span class="posted-on">' . get_the_date() . '</span>';
                echo '<span class="byline"> ' . $byline . '</span>';
                ?>
            </div>
        </header>
        
        <div class="entry-content">
            <?php
            if (is_singular()) :
                the_content();
            else :
                the_excerpt();
            endif;
            ?>
        </div>
        
        <?php if (!is_singular()) : ?>
            <footer class="entry-footer mt-4">
                <a href="<?php the_permalink(); ?>" class="read-more btn btn-primary">
                    <?php esc_html_e('Read More', 'tika-tone'); ?>
                </a>
            </footer>
        <?php endif; ?>
    </div>
</article>
