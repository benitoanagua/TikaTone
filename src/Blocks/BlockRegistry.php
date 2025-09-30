<?php

namespace TikaToneTheme\Blocks;

class BlockRegistry
{
    public function init(): void
    {
        add_action('init', [$this, 'register_blocks']);
        add_filter('block_categories_all', [$this, 'add_block_categories']);
    }

    public function register_blocks(): void
    {
        // Registrar bloques personalizados aquí
    }

    public function add_block_categories(array $categories): array
    {
        return array_merge(
            $categories,
            [
                [
                    'slug'  => 'tika-tone',
                    'title' => __('Tika Tone Blocks', 'tika-tone'),
                ],
            ]
        );
    }
}
