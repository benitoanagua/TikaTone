<?php
/**
 * Template part for displaying page content
 *
 * @package Tika Tone
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header mb-8">
        <?php the_title('<h1 class="entry-title text-4xl font-bold">', '</h1>'); ?>
    </header>
    
    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail mb-8">
            <?php the_post_thumbnail('large', ['class' => 'w-full h-64 object-cover rounded-lg']); ?>
        </div>
    <?php endif; ?>
    
    <div class="entry-content prose max-w-none">
        <?php
        the_content();
        
        wp_link_pages([
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'tika-tone'),
            'after'  => '</div>',
        ]);
        ?>
    </div>
</article>
