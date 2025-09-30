<?php

/**
 * Component shortcodes for Lit components
 *
 * @package TikaToneTheme
 */

namespace TikaToneTheme\Shortcodes;

class ComponentShortcodes
{
    /**
     * Initialize shortcodes
     */
    public function init(): void
    {
        add_shortcode('grille', [$this, 'render_grille']);
        add_shortcode('logo', [$this, 'render_logo']);
        add_shortcode('navbar', [$this, 'render_navbar']);
        add_shortcode('offcanvas', [$this, 'render_offcanvas']);
        add_shortcode('card', [$this, 'render_card']);
        add_shortcode('overlay', [$this, 'render_overlay']);
        add_shortcode('theme_toggle', [$this, 'render_theme_toggle']);
        add_shortcode('accordion', [$this, 'render_accordion']);
        add_shortcode('slideshow', [$this, 'render_slideshow']);
        add_shortcode('tabs', [$this, 'render_tabs']);
        add_shortcode('carousel', [$this, 'render_carousel']);
        add_shortcode('stack', [$this, 'render_stack']);
    }

    /**
     * Render grille component
     */
    public function render_grille($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'desktop' => '3',
            'mobile' => '2',
            'gap' => 'medium',
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-grille desktop="%s" mobile="%s" gap="%s" class="%s">%s</wc-grille>',
            esc_attr($atts['desktop']),
            esc_attr($atts['mobile']),
            esc_attr($atts['gap']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render grille item
     */
    public function render_grille_item($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-grille-item class="%s">%s</wc-grille-item>',
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render logo component
     */
    public function render_logo($atts): string
    {
        $atts = shortcode_atts([
            'class' => 'h-8 fill-primary',
            'size' => ''
        ], $atts);

        $class = $atts['class'];
        if (!empty($atts['size'])) {
            $class .= ' ' . $atts['size'];
        }

        return sprintf(
            '<wc-logo class="%s"></wc-logo>',
            esc_attr(trim($class))
        );
    }

    /**
     * Render navbar component
     */
    public function render_navbar($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'class' => '',
            'sticky' => 'false'
        ], $atts);

        $sticky_attr = $atts['sticky'] === 'true' ? 'sticky' : '';

        return sprintf(
            '<wc-navbar class="%s" %s>%s</wc-navbar>',
            esc_attr($atts['class']),
            $sticky_attr,
            do_shortcode($content)
        );
    }

    /**
     * Render offcanvas component
     */
    public function render_offcanvas($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'class' => '',
            'position' => 'left'
        ], $atts);

        return sprintf(
            '<wc-offcanvas class="%s" position="%s">%s</wc-offcanvas>',
            esc_attr($atts['class']),
            esc_attr($atts['position']),
            do_shortcode($content)
        );
    }

    /**
     * Render card component
     */
    public function render_card($atts): string
    {
        $atts = shortcode_atts([
            'title' => '',
            'url' => '',
            'excerpt' => '',
            'feature_image' => '',
            'tag_name' => '',
            'tag_url' => '',
            'author_name' => '',
            'author_url' => '',
            'author_profile_image' => '',
            'reading_time' => '',
            'published_at' => '',
            'heading' => '4',
            'media_align' => 'left',
            'media_width' => 'is-half',
            'aspect_ratio' => 'monitor',
            'auto_layout' => 'false',
            'class' => ''
        ], $atts);

        $auto_layout = $atts['auto_layout'] === 'true' ? 'auto-layout' : '';

        return sprintf(
            '<wc-card 
                title="%s" 
                url="%s" 
                excerpt="%s" 
                feature-image="%s" 
                tag-name="%s" 
                tag-url="%s" 
                author-name="%s" 
                author-url="%s" 
                author-profile-image="%s" 
                reading-time="%s" 
                published-at="%s" 
                heading="%s" 
                media-align="%s" 
                media-width="%s" 
                aspect-ratio="%s" 
                %s 
                class="%s"
            ></wc-card>',
            esc_attr($atts['title']),
            esc_attr($atts['url']),
            esc_attr($atts['excerpt']),
            esc_attr($atts['feature_image']),
            esc_attr($atts['tag_name']),
            esc_attr($atts['tag_url']),
            esc_attr($atts['author_name']),
            esc_attr($atts['author_url']),
            esc_attr($atts['author_profile_image']),
            esc_attr($atts['reading_time']),
            esc_attr($atts['published_at']),
            esc_attr($atts['heading']),
            esc_attr($atts['media_align']),
            esc_attr($atts['media_width']),
            esc_attr($atts['aspect_ratio']),
            $auto_layout,
            esc_attr($atts['class'])
        );
    }

    /**
     * Render overlay component
     */
    public function render_overlay($atts): string
    {
        $atts = shortcode_atts([
            'title' => '',
            'url' => '',
            'feature_image' => '',
            'tag_name' => '',
            'author_name' => '',
            'published_at' => '',
            'reading_time' => '',
            'heading' => '3',
            'aspect_ratio' => 'monitor',
            'align' => 'center',
            'position' => 'center',
            'box' => 'background',
            'fill' => 'gradient',
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-overlay 
                title="%s" 
                url="%s" 
                feature-image="%s" 
                tag-name="%s" 
                author-name="%s" 
                published-at="%s" 
                reading-time="%s" 
                heading="%s" 
                aspect-ratio="%s" 
                align="%s" 
                position="%s" 
                box="%s" 
                fill="%s" 
                class="%s"
            ></wc-overlay>',
            esc_attr($atts['title']),
            esc_attr($atts['url']),
            esc_attr($atts['feature_image']),
            esc_attr($atts['tag_name']),
            esc_attr($atts['author_name']),
            esc_attr($atts['published_at']),
            esc_attr($atts['reading_time']),
            esc_attr($atts['heading']),
            esc_attr($atts['aspect_ratio']),
            esc_attr($atts['align']),
            esc_attr($atts['position']),
            esc_attr($atts['box']),
            esc_attr($atts['fill']),
            esc_attr($atts['class'])
        );
    }

    /**
     * Render theme toggle component
     */
    public function render_theme_toggle($atts): string
    {
        $atts = shortcode_atts([
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-theme-toggle class="%s"></wc-theme-toggle>',
            esc_attr($atts['class'])
        );
    }

    /**
     * Render accordion component
     */
    public function render_accordion($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'multiple' => 'false',
            'variant' => 'default',
            'class' => ''
        ], $atts);

        $multiple = $atts['multiple'] === 'true' ? 'multiple' : '';

        return sprintf(
            '<wc-accordion variant="%s" %s class="%s">%s</wc-accordion>',
            esc_attr($atts['variant']),
            $multiple,
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render accordion item
     */
    public function render_accordion_item($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'open' => 'false',
            'disabled' => 'false',
            'class' => ''
        ], $atts);

        $open = $atts['open'] === 'true' ? 'open' : '';
        $disabled = $atts['disabled'] === 'true' ? 'disabled' : '';

        return sprintf(
            '<wc-accordion-item %s %s class="%s">%s</wc-accordion-item>',
            $open,
            $disabled,
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render slideshow component
     */
    public function render_slideshow($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'show_nav' => 'true',
            'modal' => 'false',
            'interval' => '4000',
            'auto_play' => 'true',
            'show_indicators' => 'true',
            'class' => ''
        ], $atts);

        $show_nav = $atts['show_nav'] === 'true' ? 'show-nav' : '';
        $modal = $atts['modal'] === 'true' ? 'modal' : '';
        $auto_play = $atts['auto_play'] === 'true' ? 'auto-play' : '';
        $show_indicators = $atts['show_indicators'] === 'true' ? 'show-indicators' : '';

        return sprintf(
            '<wc-slideshow 
                %s %s %s %s 
                interval="%s" 
                class="%s"
            >%s</wc-slideshow>',
            $show_nav,
            $modal,
            $auto_play,
            $show_indicators,
            esc_attr($atts['interval']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render slideshow item
     */
    public function render_slideshow_item($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-slideshow-item class="%s">%s</wc-slideshow-item>',
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render tabs component
     */
    public function render_tabs($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'active_tab' => '0',
            'disabled' => 'false',
            'class' => ''
        ], $atts);

        $disabled = $atts['disabled'] === 'true' ? 'disabled' : '';

        return sprintf(
            '<wc-tabs active-tab="%s" %s class="%s">%s</wc-tabs>',
            esc_attr($atts['active_tab']),
            $disabled,
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render tab component
     */
    public function render_tab($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'active' => 'false',
            'disabled' => 'false',
            'slot' => 'tabs',
            'class' => ''
        ], $atts);

        $active = $atts['active'] === 'true' ? 'active' : '';
        $disabled = $atts['disabled'] === 'true' ? 'disabled' : '';

        return sprintf(
            '<wc-tab %s %s slot="%s" class="%s">%s</wc-tab>',
            $active,
            $disabled,
            esc_attr($atts['slot']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render tab panel component
     */
    public function render_tab_panel($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'active' => 'false',
            'slot' => 'panels',
            'class' => ''
        ], $atts);

        $active = $atts['active'] === 'true' ? 'active' : '';

        return sprintf(
            '<wc-tab-panel %s slot="%s" class="%s">%s</wc-tab-panel>',
            $active,
            esc_attr($atts['slot']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render carousel component
     */
    public function render_carousel($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'desktop' => '3',
            'mobile' => '1',
            'gap' => 'medium',
            'interval' => '3000',
            'auto_play' => 'true',
            'show_arrows' => 'true',
            'show_dots' => 'true',
            'class' => ''
        ], $atts);

        $auto_play = $atts['auto_play'] === 'true' ? 'auto-play' : '';
        $show_arrows = $atts['show_arrows'] === 'true' ? 'show-arrows' : '';
        $show_dots = $atts['show_dots'] === 'true' ? 'show-dots' : '';

        return sprintf(
            '<wc-carousel 
                desktop="%s" 
                mobile="%s" 
                gap="%s" 
                interval="%s" 
                %s %s %s 
                class="%s"
            >%s</wc-carousel>',
            esc_attr($atts['desktop']),
            esc_attr($atts['mobile']),
            esc_attr($atts['gap']),
            esc_attr($atts['interval']),
            $auto_play,
            $show_arrows,
            $show_dots,
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render carousel item
     */
    public function render_carousel_item($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-carousel-item class="%s">%s</wc-carousel-item>',
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render stack component
     */
    public function render_stack($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'max_items' => '3',
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-stack max-items="%s" class="%s">%s</wc-stack>',
            esc_attr($atts['max_items']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }

    /**
     * Render stack item
     */
    public function render_stack_item($atts, $content = null): string
    {
        $atts = shortcode_atts([
            'title' => '',
            'class' => ''
        ], $atts);

        return sprintf(
            '<wc-stack-item title="%s" class="%s">%s</wc-stack-item>',
            esc_attr($atts['title']),
            esc_attr($atts['class']),
            do_shortcode($content)
        );
    }
}
