import '../css/main.css';
import MainApp from '../svelte/MainApp.svelte';

// Inicializar componentes Svelte
document.addEventListener('DOMContentLoaded', () => {
    const appContainers = document.querySelectorAll('.svelte-app');
    appContainers.forEach(container => {
        new MainApp({
            target: container,
            props: {
                themeData: window.themeData || {}
            }
        });
    });
});

// Alpine.js components
import Alpine from 'alpinejs';
window.Alpine = Alpine;
Alpine.start();
