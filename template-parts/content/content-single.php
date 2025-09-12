<?php
/**
 * Template part for displaying single posts
 *
 * @package Tika Tone
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg shadow-md overflow-hidden'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail mb-6">
            <?php the_post_thumbnail('large', ['class' => 'w-full h-64 object-cover rounded-lg']); ?>
        </div>
    <?php endif; ?>
    
    <header class="entry-header mb-6">
        <?php the_title('<h1 class="entry-title text-4xl font-bold mb-4">', '</h1>'); ?>
        
        <div class="entry-meta text-gray-600 mb-4">
            <?php
            $byline = sprintf(
                esc_html_x('by %s', 'post author', 'tika-tone'),
                '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
            );
            
            echo '<span class="posted-on">' . get_the_date() . '</span>';
            echo '<span class="byline"> ' . $byline . '</span>';
            
            if (has_category()) :
                echo '<span class="categories"> in ' . get_the_category_list(', ') . '</span>';
            endif;
            ?>
        </div>
    </header>
    
    <div class="entry-content prose max-w-none">
        <?php the_content(); ?>
        
        <?php
        wp_link_pages([
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'tika-tone'),
            'after'  => '</div>',
        ]);
        ?>
    </div>
    
    <footer class="entry-footer mt-8 pt-6 border-t">
        <?php if (has_tag()) : ?>
            <div class="tags mb-4">
                <span class="tags-title font-semibold"><?php esc_html_e('Tags:', 'tika-tone'); ?></span>
                <?php the_tags('', ', ', ''); ?>
            </div>
        <?php endif; ?>
        
        <?php
        // Author bio
        if (get_the_author_meta('description')) :
        ?>
            <div class="author-info bg-gray-50 p-6 rounded-lg">
                <div class="author-avatar float-left mr-4">
                    <?php echo get_avatar(get_the_author_meta('user_email'), 80); ?>
                </div>
                <div class="author-description">
                    <h4 class="author-title font-semibold text-lg">
                        <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>">
                            <?php echo get_the_author(); ?>
                        </a>
                    </h4>
                    <p class="author-bio"><?php the_author_meta('description'); ?></p>
                </div>
            </div>
        <?php endif; ?>
    </footer>
</article>
