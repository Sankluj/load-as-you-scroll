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
    const unobserve = jest.fn();

    // you can also pass the mock implementation
    // to jest.fn as an argument
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }));
  });

  it("should return null if the first parameter is not an array", () => {
    //GIVEN
    const elements = null;

    //WHEN
    const [ref, eltsSubset] = useScrollStepper(elements);

    //THEN
    expect(ref).toEqual(null);
    expect(eltsSubset).toEqual(null);
  });

  it("should return a sub array of ten elements when the first parameter is an array of more than 10 elements", () => {
    //GIVEN
    const elements = [...Array(5000)];

    //WHEN
    const { container } = render(<Component elements={elements} />);

    //THEN
    const displayedElts = screen.getAllByTestId("element");
    expect(displayedElts.length).toEqual(10);
  });
});
