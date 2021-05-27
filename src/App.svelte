<script>
  import Display from "./Display.svelte";
  import Header from "./Header.svelte";
  import Keyboard from "./Keyboard.svelte";
</script>

<main>
  <div class="calc-root">
    <Header />

    <Display />

    <Keyboard />
  </div>
</main>

<style>
  .calc-root {
    display: grid;
    grid-template-rows: auto 100px 1fr;
    gap: 1.625rem;
    max-width: 600px;
    height: calc(100% - (1.625rem * 2));
    margin: 0 auto;
    padding: 1.625rem;
  }
</style>
