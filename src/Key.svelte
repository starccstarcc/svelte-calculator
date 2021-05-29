<script>
  import {
    calculator,
    handleEquation,
    updateDisplay,
  } from "./stores/calculator";

  export let control;

  const handleClick = (e) => {
    const key = e.target.dataset.keyValue;
    const elem = e.target;

    if (key === "=") {
      // remove all active classes after result
      document
        .querySelectorAll(".key")
        .forEach((e) => e.classList.remove("active"));

      return handleEquation();
    }

    if (key === $calculator.operator) {
      elem.classList.toggle("active");
    }

    updateDisplay(key);
  };
</script>

<div
  class={`key ${control.class} ${
    control.value === $calculator.operator &&
    $calculator.operator !== "reset" &&
    $calculator.operator !== "del" &&
    $calculator.operator !== "="
      ? "active"
      : ""
  }`}
  data-key-value={control.value}
  data-testid={`key${control.value}`}
  id={control.value}
  on:click={handleClick}
>
  {control.value}
</div>

<style>
  .key {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-button-text);
    font-size: 1.2rem;
    font-family: futura-pt, sans-serif;
    text-transform: uppercase;
    background: var(--color-button-background);
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 0 var(--color-button-shadow);
    user-select: none;
  }

  @media screen and (min-width: 600px) {
    .key {
      font-size: 1.5rem;
    }
  }

  .double {
    grid-column: span 2;
  }

  .secondary {
    color: white;
    background: var(--color-button-alt);
    box-shadow: 0 0.25rem 0 var(--color-button-alt-shadow);
  }

  .result {
    color: white;
    background: var(--color-button-result);
    box-shadow: 0 0.25rem 0 var(--color-button-result-shadow);
  }

  .key:active,
  .key:focus,
  .double:active,
  .double:focus,
  .secondary:active,
  .secondary:focus,
  .result:active,
  .result:focus {
    box-shadow: 0 0 0 transparent;
    transform: translateY(0.25rem);
  }

  .active {
    background: #e2e297;
    box-shadow: 0 0 0 transparent;
    transform: translateY(0.25rem);
  }
</style>
