<?php

/**
 * The template for displaying comments
 *
 * @package TikaTone
 */

if (!defined('ABSPATH')) {
    exit;
}

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $tika_tone_comment_count = get_comments_number();
            if ('1' === $tika_tone_comment_count) {
                printf(
                    esc_html__('One thought on &ldquo;%s&rdquo;', 'tika-tone'),
                    '<span>' . wp_kses_post(get_the_title()) . '</span>'
                );
            } else {
                printf(
                    esc_html__('%1$s thoughts on &ldquo;%2$s&rdquo;', 'tika-tone'),
                    number_format_i18n($tika_tone_comment_count),
                    '<span>' . wp_kses_post(get_the_title()) . '</span>'
                );
            }
            ?>
        </h2>

        <?php the_comments_navigation(); ?>

        <ol class="comment-list">
            <?php
            wp_list_comments([
                'style'      => 'ol',
                'short_ping' => true,
            ]);
            ?>
        </ol>

        <?php the_comments_navigation(); ?>

        <?php if (!comments_open()) : ?>
            <p class="no-comments"><?php esc_html_e('Comments are closed.', 'tika-tone'); ?></p>
        <?php endif; ?>

    <?php endif; ?>

    <?php
    comment_form([
        'title_reply'        => esc_html__('Leave a Reply', 'tika-tone'),
        'title_reply_to'     => esc_html__('Leave a Reply to %s', 'tika-tone'),
        'cancel_reply_link'  => esc_html__('Cancel Reply', 'tika-tone'),
        'label_submit'       => esc_html__('Post Comment', 'tika-tone'),
    ]);
    ?>
</div>