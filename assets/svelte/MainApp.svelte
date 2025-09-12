<script>
  import { onMount } from 'svelte';
  import Counter from './components/Counter.svelte';
  import ThemeToggle from './components/ThemeToggle.svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    console.log('Tika Tone MainApp mounted');
  });
</script>

<div class="theme-main-app">
  {#if mounted}
    <div class="space-y-8">
      <Counter />
      <ThemeToggle />
      
      <!-- Aquí puedes agregar más componentes del tema -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Bienvenido a {mounted ? 'Tika Tone' : '...'}</h3>
        <p class="text-gray-600">Este es un componente Svelte integrado en WordPress.</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .theme-main-app {
    width: 100%;
  }
  
  .space-y-8 > * + * {
    margin-top: 2rem;
  }
  
  .bg-gray-50 {
    background-color: rgb(249 250 251);
  }
  
  .p-6 {
    padding: 1.5rem;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
  }
  
  .font-semibold {
    font-weight: 600;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .text-gray-600 {
    color: rgb(75 85 99);
  }
</style>
