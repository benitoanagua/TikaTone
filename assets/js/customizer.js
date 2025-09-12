import '../css/customizer.css';

console.log('Tika Tone Customizer JS loaded');

// Funcionalidades para el customizer
wp.customize.bind('ready', () => {
    console.log('WordPress Customizer ready');
});
