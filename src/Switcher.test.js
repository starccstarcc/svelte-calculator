import { render, fireEvent, screen } from "@testing-library/svelte";

import Switcher from "./Switcher.svelte";
import App from "./App.svelte";

import { reset } from "./stores/calculator";

describe("Switcher basic functionalities", () => {
  beforeAll(() => {
    render(App);
  });

  it("should switch positions when clicked", async () => {
    /** Positions are handled by class, so we need to test if it is present */
    const { container } = render(Switcher);
    const circle = container.querySelector(".circle");

    const theme1 = container.querySelector("#theme-1");
    const theme2 = container.querySelector("#theme-2");
    const theme3 = container.querySelector("#theme-3");

    expect(circle).toHaveClass("step-1");

    await fireEvent.click(theme2);

    expect(circle).toHaveClass("step-2");

    await fireEvent.click(theme3);

    expect(circle).toHaveClass("step-3");

    await fireEvent.click(theme1);

    expect(circle).toHaveClass("step-1");
  });

  it("should switch theme when in the correct position", async () => {
    const { container } = render(App);

    const theme2 = container.querySelector("#theme-2");
    const root = container.querySelector("#app-root");

    await fireEvent.click(theme2);

    // expect(root).toBeInTheDocument();
    expect(root).toHaveClass("midnight");
  });
});
