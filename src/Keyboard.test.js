import Keyboard from "./Keyboard.svelte";
import { fireEvent, render, screen } from "@testing-library/svelte";

describe("keyboard basic interactions", () => {
  it("should render", () => {
    const { getByText } = render(Keyboard);

    const keyboard = screen.getByTestId("keyboard");
    const keyPlus = getByText("+", { exact: true });

    expect(keyboard).toBeInTheDocument();
    expect(keyPlus).toBeInTheDocument();
  });

  it("should display active class if it is an operator", async () => {
    const { getByText } = render(Keyboard);
    const keyPlus = getByText("+", { exact: true });
    const keyMinus = getByText("-", { exact: true });
    const key9 = getByText("9", { exact: true });

    await fireEvent.click(keyMinus);
    await fireEvent.click(keyPlus);
    await fireEvent.click(key9);

    expect(keyPlus).toHaveClass("active"); // only the last operator should hava .active

    expect(key9).not.toHaveClass("active");
    expect(keyMinus).not.toHaveClass("active");
  });
});
