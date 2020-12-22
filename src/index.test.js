import { render, screen } from "@testing-library/react";
import React, { Fragment } from "react";

import useScrollStepper from "./index.js";

const Component = ({ elements }) => {
  const [scrollStepperNode, displayedElts] = useScrollStepper(elements);

  return (
    <div>
      {displayedElts.map((_, index) => (
        <Fragment key={index}>
          <div data-testid="element">
            {index} of {elements.length}
          </div>
          {displayedElts.length - index === 4 && (
            <span data-testid="trigger-element" ref={scrollStepperNode}>
              trigger
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

describe("useScrollStepper", () => {
  beforeEach(() => {
    const observe = jest.fn();
    const disconnect = jest.fn();

    window.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
    }));
  });

  it("should throw an error if the first parameter is not an array", () => {
    //GIVEN
    const elements = null;

    // WHEN
    const componentRenderer = () => render(<Component elements={elements} />);

    //THEN
    expect(componentRenderer).toThrow("elements is not an array");
  });

  it("should return a sub array of ten elements when the first parameter is an array of more than 10 elements", () => {
    //GIVEN
    const elements = [...Array(5000)];

    //WHEN
    render(<Component elements={elements} />);

    //THEN
    const displayedElts = screen.getAllByTestId("element");
    expect(displayedElts.length).toEqual(10);
  });
});
