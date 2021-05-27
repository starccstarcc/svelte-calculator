import App from "./App.svelte";
import { render, fireEvent, screen } from "@testing-library/svelte";
import { reset } from "./stores/calculator";

describe("Display component basic functionalities", () => {
  afterEach(() => {
    reset();
  });

  it("should display only numbers", async () => {
    const { container } = render(App);

    const key1 = container.querySelector('.key[data-key-value="1"]');
    const key0 = container.querySelector('.key[data-key-value="0"]');
    const keyPlus = container.querySelector('.key[data-key-value="+"]');
    const keyMinus = container.querySelector('.key[data-key-value="-"]');
    const display = container.querySelector(".calc-main-number");

    expect(display).toBeInTheDocument();

    let repeat = 0;

    while (repeat < 10) {
      await fireEvent.click(key0);
      repeat++;
    }

    await fireEvent.click(keyPlus);
    await fireEvent.click(keyMinus);
    await fireEvent.click(key0);
    await fireEvent.click(key1);
    await fireEvent.click(key1);
    await fireEvent.click(key0);

    expect(display.innerHTML).toMatch(/^110$/);
  });

  it("should display float numbers", async () => {
    const { container } = render(App);

    const display = container.querySelector(".calc-main-number");

    const key = container.querySelector('.key[data-key-value="1"]');
    const keyDot = container.querySelector('.key[data-key-value="."]');

    expect(display).toBeInTheDocument();

    await fireEvent.click(keyDot);
    await fireEvent.click(key);
    await fireEvent.click(keyDot);
    await fireEvent.click(key);

    expect(display.innerHTML).toMatch(/^1\.1$/);
  });

  it("should display firstNumber of the equation at the bottom (history)", async () => {
    const { container } = render(App);

    const display = container.querySelector(".calc-main-number");

    const key1 = container.querySelector('.key[data-key-value="1"]');
    const keyDot = container.querySelector('.key[data-key-value="."]');
    const keyPlus = container.querySelector('.key[data-key-value="+"]');

    await fireEvent.click(key1); // 1
    await fireEvent.click(keyDot); // 1.
    await fireEvent.click(key1); // 1.1
    await fireEvent.click(keyPlus); // 0
    await fireEvent.click(key1); // 1

    expect(display.innerHTML).toMatch(/^1$/);
    expect(screen.getByTestId("first-number")).toHaveTextContent("1.1");
  });

  it("should update first number when the operator was first pressed", async () => {
    const { container } = render(App);

    const display = container.querySelector(".calc-main-number");

    const keyPlus = container.querySelector('.key[data-key-value="+"]');
    const keyMinus = container.querySelector('.key[data-key-value="-"]');
    const keyMultiply = container.querySelector('.key[data-key-value="x"]');
    const keyDivide = container.querySelector('.key[data-key-value="/"]');
    const key1 = container.querySelector('.key[data-key-value="1"]');

    await fireEvent.click(keyPlus);
    await fireEvent.click(keyMinus);
    await fireEvent.click(keyMultiply);
    await fireEvent.click(keyDivide);
    await fireEvent.click(key1);

    expect(screen.getByTestId("first-number")).toHaveTextContent("0");
    expect(display.innerHTML).toMatch(/^1$/);
  });
});

describe("math operations", () => {
  beforeEach(() => {
    render(App);
  });

  afterEach(() => {
    reset();
  });

  it("should sum integers", async () => {
    const display = screen.getByTestId("main-number");
    const key1 = screen.getByTestId("key1");
    const keyPlus = screen.getByTestId("key+");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key1);
    await fireEvent.click(keyPlus);
    await fireEvent.click(key1);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toMatch(/2/);
  });
  it("should sum floats", async () => {
    const display = screen.getByTestId("main-number");
    const key1 = screen.getByTestId("key1");
    const keyDot = screen.getByTestId("key.");
    const keyPlus = screen.getByTestId("key+");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key1);
    await fireEvent.click(keyDot);
    await fireEvent.click(key1);
    await fireEvent.click(keyPlus);
    await fireEvent.click(key1);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("2.1");
  });

  it("should subtract", async () => {
    const display = screen.getByTestId("main-number");
    const key2 = screen.getByTestId("key2");
    const key1 = screen.getByTestId("key1");
    const keyMinus = screen.getByTestId("key-");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key2);
    await fireEvent.click(key2);
    await fireEvent.click(keyMinus);
    await fireEvent.click(key1);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("21");
  });

  it("should subtract floats", async () => {
    const display = screen.getByTestId("main-number");
    const key2 = screen.getByTestId("key2");
    const key1 = screen.getByTestId("key1");
    const keyDot = screen.getByTestId("key.");
    const keyMinus = screen.getByTestId("key-");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key2);
    await fireEvent.click(key2);
    await fireEvent.click(keyDot);
    await fireEvent.click(key2);
    await fireEvent.click(keyMinus);
    await fireEvent.click(key1);
    await fireEvent.click(key1);
    await fireEvent.click(keyDot);
    await fireEvent.click(key1);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("11.1");
  });

  it("should multiply", async () => {
    const display = screen.getByTestId("main-number");
    const key2 = screen.getByTestId("key2");
    const key1 = screen.getByTestId("key1");
    const keyTimes = screen.getByTestId("keyx");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key2);
    await fireEvent.click(keyTimes);
    await fireEvent.click(key1);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("2");
  });

  it("should multiply floats", async () => {
    const display = screen.getByTestId("main-number");
    const key5 = screen.getByTestId("key5");
    const key2 = screen.getByTestId("key2");
    const key1 = screen.getByTestId("key1");
    const keyDot = screen.getByTestId("key.");
    const keyTimes = screen.getByTestId("keyx");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key2);
    await fireEvent.click(keyDot);
    await fireEvent.click(key5);
    await fireEvent.click(keyTimes);
    await fireEvent.click(key2);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("5");
  });

  it("should divide", async () => {
    const display = screen.getByTestId("main-number");
    const keyZero = screen.getByTestId("key0");
    const key2 = screen.getByTestId("key2");
    const keyDivide = screen.getByTestId("key/");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key2);
    await fireEvent.click(keyZero);
    await fireEvent.click(keyDivide);
    await fireEvent.click(key2);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("10");
  });

  it("should use result number as next equation", async () => {
    const display = screen.getByTestId("main-number");
    const keyZero = screen.getByTestId("key0");
    const key1 = screen.getByTestId("key1");
    const key2 = screen.getByTestId("key2");
    const keyDivide = screen.getByTestId("key/");
    const keyEqual = screen.getByTestId("key=");

    await fireEvent.click(key1);
    await fireEvent.click(keyZero);
    await fireEvent.click(keyZero);
    await fireEvent.click(keyDivide);
    await fireEvent.click(key2);
    await fireEvent.click(keyEqual);
    await fireEvent.click(keyEqual);
    await fireEvent.click(keyEqual);

    expect(display.innerHTML).toBe("12.5");
  });
});
