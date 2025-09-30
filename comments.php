<?php

/**
 * The template for displaying comments with Lit components
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

<wc-card class="comments-area mt-8" title="<?php esc_attr_e('Comments', 'tika-tone'); ?>">
    <div class="p-6">
        <?php if (have_comments()) : ?>
            <wc-accordion variant="bordered" class="mb-6">
                <wc-accordion-item open>
                    <div slot="header" class="flex items-center justify-between w-full">
                        <h2 class="comments-title text-lg font-semibold text-onSurface">
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
                        <span class="icon-[carbon--chevron-down] w-4 h-4 text-onSurfaceVariant transition-transform"></span>
                    </div>

                    <ol class="comment-list space-y-4">
                        <?php
                        wp_list_comments([
                            'style'      => 'ol',
                            'short_ping' => true,
                            'avatar_size' => 50,
                            'callback' => function ($comment, $args, $depth) {
                        ?>
                            <li id="comment-<?php comment_ID(); ?>" <?php comment_class('bg-surfaceContainerLow p-4 rounded-lg'); ?>>
                                <article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
                                    <footer class="comment-meta flex items-center gap-3 mb-3">
                                        <div class="comment-author vcard flex items-center gap-2">
                                            <?php if ($args['avatar_size'] != 0) echo get_avatar($comment, $args['avatar_size']); ?>
                                            <b class="fn text-onSurface"><?php comment_author(); ?></b>
                                        </div>
                                        <div class="comment-metadata text-onSurfaceVariant text-sm">
                                            <a href="<?php echo esc_url(get_comment_link($comment->comment_ID)); ?>">
                                                <time datetime="<?php comment_time('c'); ?>">
                                                    <?php
                                                    printf(
                                                        esc_html__('%1$s at %2$s', 'tika-tone'),
                                                        get_comment_date(),
                                                        get_comment_time()
                                                    );
                                                    ?>
                                                </time>
                                            </a>
                                        </div>
                                    </footer>

                                    <div class="comment-content text-onSurface">
                                        <?php comment_text(); ?>
                                    </div>

                                    <div class="comment-actions flex gap-2 mt-3">
                                        <?php
                                        comment_reply_link(array_merge($args, [
                                            'depth' => $depth,
                                            'max_depth' => $args['max_depth'],
                                            'before' => '<div class="reply">',
                                            'after' => '</div>'
                                        ]));
                                        edit_comment_link(__('Edit', 'tika-tone'), '<div class="edit-link">', '</div>');
                                        ?>
                                    </div>
                                </article>
                            </li>
                        <?php
                            }
                        ]);
                        ?>
                    </ol>

                    <?php the_comments_navigation(); ?>
                </wc-accordion-item>
            </wc-accordion>
        <?php endif; ?>

        <?php if (!comments_open()) : ?>
            <p class="no-comments text-onSurfaceVariant text-center py-4">
                <?php esc_html_e('Comments are closed.', 'tika-tone'); ?>
            </p>
        <?php else : ?>
            <wc-accordion variant="bordered">
                <wc-accordion-item>
                    <div slot="header" class="flex items-center justify-between w-full">
                        <h3 class="text-lg font-semibold text-onSurface">
                            <?php esc_html_e('Leave a Comment', 'tika-tone'); ?>
                        </h3>
                        <span class="icon-[carbon--chevron-down] w-4 h-4 text-onSurfaceVariant transition-transform"></span>
                    </div>

                    <div class="comment-respond">
                        <?php
                        comment_form([
                            'title_reply' => '',
                            'title_reply_before' => '',
                            'title_reply_after' => '',
                            'comment_notes_before' => '<p class="comment-notes text-onSurfaceVariant text-sm mb-4">' . esc_html__('Your email address will not be published. Required fields are marked *', 'tika-tone') . '</p>',
                            'comment_field' => '
                                <div class="comment-form-comment mb-4">
                                    <label for="comment" class="block text-sm font-medium text-onSurface mb-2">' . esc_html__('Comment *', 'tika-tone') . '</label>
                                    <textarea id="comment" name="comment" class="w-full px-3 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" rows="5" required></textarea>
                                </div>',
                            'fields' => [
                                'author' => '
                                    <div class="comment-form-author mb-4">
                                        <label for="author" class="block text-sm font-medium text-onSurface mb-2">' . esc_html__('Name *', 'tika-tone') . '</label>
                                        <input id="author" name="author" type="text" class="w-full px-3 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" required>
                                    </div>',
                                'email' => '
                                    <div class="comment-form-email mb-4">
                                        <label for="email" class="block text-sm font-medium text-onSurface mb-2">' . esc_html__('Email *', 'tika-tone') . '</label>
                                        <input id="email" name="email" type="email" class="w-full px-3 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" required>
                                    </div>',
                                'url' => '
                                    <div class="comment-form-url mb-4">
                                        <label for="url" class="block text-sm font-medium text-onSurface mb-2">' . esc_html__('Website', 'tika-tone') . '</label>
                                        <input id="url" name="url" type="url" class="w-full px-3 py-2 bg-surfaceContainerHigh border border-outlineVariant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary">
                                    </div>',
                            ],
                            'class_submit' => 'px-6 py-3 bg-primary text-onPrimary hover:bg-primaryContainer hover:text-onPrimaryContainer transition-colors rounded-lg font-medium cursor-pointer',
                            'label_submit' => esc_html__('Post Comment', 'tika-tone'),
                        ]);
                        ?>
                    </div>
                </wc-accordion-item>
            </wc-accordion>
        <?php endif; ?>
    </div>
</wc-card>