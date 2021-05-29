<script>
  import { calculator } from "./stores/calculator";
</script>

<div class="calc-display" data-testid="display">
  <div class="calc-main-number" data-testid="main-number">
    {!$calculator.display.length ? 0 : $calculator.display.join("")}
  </div>

  {#if $calculator.firstNumber !== null}
    <div class="calc-history">
      <span data-testid="first-number">{$calculator.firstNumber}</span>
      {#if $calculator.result}
        <span>{$calculator.operator}</span>
        <span>{$calculator.secondNumber}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .calc-display {
    padding: 1.625rem;
    color: var(--color-display-text);
    font-size: 2.5rem;
    text-align: right;
    background: var(--color-display-background);
    border-radius: 0.625rem;
  }

  .calc-main-number {
    transform: translateY(-0.625rem);
  }

  .calc-history {
    font-size: 0.9rem;
  }
</style>
