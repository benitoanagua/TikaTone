<script>
  import { onMount } from 'svelte';
  
  let isDark = false;
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    // Verificar preferencia del usuario o tema del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  });
  
  function toggleTheme() {
    isDark = !isDark;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

{#if mounted}
  <div class="theme-toggle-component bg-white p-6 rounded-lg shadow-sm border">
    <h3 class="text-lg font-semibold mb-4">Cambiar Tema</h3>
    
    <button
      on:click={toggleTheme}
      class="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    >
      {#if isDark}
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
        </svg>
        <span>Modo Claro</span>
      {:else}
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
        <span>Modo Oscuro</span>
      {/if}
    </button>
  </div>
{/if}

<style>
  .theme-toggle-component {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid rgb(229 231 235);
  }
  
  .bg-gray-100 {
    background-color: rgb(243 244 246);
  }
  
  .hover\:bg-gray-200:hover {
    background-color: rgb(229 231 235);
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .w-5 {
    width: 1.25rem;
  }
  
  .h-5 {
    height: 1.25rem;
  }
  
  /* Dark mode styles */
  :global(.dark) .theme-toggle-component {
    background-color: rgb(55 65 81);
    border-color: rgb(75 85 99);
  }
  
  :global(.dark) .bg-gray-100 {
    background-color: rgb(75 85 99);
  }
  
  :global(.dark) .hover\:bg-gray-200:hover {
    background-color: rgb(107 114 128);
  }
</style>
