<script>
  $: step = 1;

  const handleChange = (e) => {
    step = e.target.value;

    const app = document.querySelector("#app-root");

    app.className = "";

    if (step === "1") {
      app.classList.add("default");
      return;
    }

    if (step === "2") {
      app.classList.add("midnight");
      return;
    }

    if (step === "3") {
      app.classList.add("canyon");
      return;
    }
  };
</script>

<div class="switcher">
  <label id="theme-1">
    1
    <input
      type="radio"
      name="theme"
      value={1}
      checked
      on:change={handleChange}
    />
  </label>
  <label id="theme-2">
    2
    <input type="radio" name="theme" value={2} on:change={handleChange} />
  </label>
  <label id="theme-3">
    3
    <input type="radio" name="theme" value={3} on:change={handleChange} />
  </label>
  <span class={`circle step-${step}`} />
</div>

<style>
  .switcher {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 6.25rem;
    height: 2rem;
    background: var(--color-switcher-background);
    border-radius: 25px;
  }

  .circle {
    position: absolute;
    top: 0.25rem;
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background: var(--color-switcher-circle);
    border-radius: 50%;
    transform: translateX(0.5rem);
    transition: transform 0.2s ease;
  }

  label {
    position: relative;
    top: -1.5rem;
    height: 2.8rem;
    padding: 0.25rem 0.7rem;
    font-weight: bolder;
    font-size: small;
  }

  input {
    display: none;
  }

  .step-1 {
    transform: translateX(0.3rem);
  }

  .step-2 {
    transform: translateX(calc((6.25rem / 2) - 0.7rem));
  }

  .step-3 {
    transform: translateX(calc(6.25rem - 1.5rem - 0.25rem));
  }
</style>
