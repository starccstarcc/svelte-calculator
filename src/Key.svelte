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
      elem.classList.add("active");
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
    color: #252d44;
    font-weight: bolder;
    font-size: 1.2rem;
    text-transform: uppercase;
    background: var(--color-light-brown);
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 0 var(--color-brown);
    user-select: none;
  }

  .double {
    grid-column: span 2;
  }

  .secondary {
    color: white;
    background: #647299;
    box-shadow: 0 0.25rem 0 #414e71;
  }

  .result {
    color: white;
    background: var(--color-orange);
    box-shadow: 0 0.25rem 0 #8f2316;
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
