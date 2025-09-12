import '../css/editor.css';

console.log('Tika Tone Editor JS loaded');

// Funcionalidades para el editor de bloques
wp.blocks.registerBlockStyle('core/paragraph', {
    name: 'boxed',
    label: 'Boxed'
});
