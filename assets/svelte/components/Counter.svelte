<script>
  let count = 0;
  
  function increment() {
    count += 1;
  }
  
  function decrement() {
    count -= 1;
  }
</script>

<div class="counter-component bg-white p-6 rounded-lg shadow-sm border">
  <h3 class="text-lg font-semibold mb-4">Contador Interactivo</h3>
  
  <div class="flex items-center space-x-4">
    <button 
      on:click={decrement}
      class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      -
    </button>
    
    <span class="text-2xl font-bold text-gray-900">{count}</span>
    
    <button 
      on:click={increment}
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
    >
      +
    </button>
  </div>
</div>

<style>
  .counter-component {
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    border: 1px solid rgb(229 231 235);
  }
  
  .flex {
    display: flex;
  }
  
  .items-center {
    align-items: center;
  }
  
  .space-x-4 > * + * {
    margin-left: 1rem;
  }
  
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .bg-red-500 {
    background-color: rgb(239 68 68);
  }
  
  .bg-green-500 {
    background-color: rgb(34 197 94);
  }
  
  .text-white {
    color: white;
  }
  
  .rounded {
    border-radius: 0.25rem;
  }
  
  .hover\:bg-red-600:hover {
    background-color: rgb(220 38 38);
  }
  
  .hover\:bg-green-600:hover {
    background-color: rgb(22 163 74);
  }
  
  .transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  .text-gray-900 {
    color: rgb(17 24 39);
  }
</style>
