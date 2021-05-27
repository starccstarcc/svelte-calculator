<script>
  import Key from "./Key.svelte";
  import { calculator } from "./stores/calculator";
</script>

<div class="calc-controls" data-testid="keyboard">
  {#each $calculator.controls as control}
    <Key {control} />
  {/each}
</div>

<style>
  .calc-controls {
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8125rem;
    max-height: 33rem;
    padding: 1.625rem;
    background: #252d44;
    border-radius: 0.625rem;
  }

  @media screen and (min-width: 600px) {
    .calc-controls {
      gap: 1.5rem;
    }
  }
</style>
