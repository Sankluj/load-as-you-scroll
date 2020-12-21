import { useState, useCallback, useEffect } from "react";

/**
 * @description return a subset of an array based on a step and a position of a DOM element
 * @param {array} elements: Array of elements to create subsets from
 * @param {object} options
 *   @param {number} step: incremental subset step
 *   @param {boolean} isDebug: display debug informations
 * @return {array}
 *   @return {function|null} ref: function registering the reference of a DOM element
 *   @return {array|undefined} elementSubset: subset of elements array
 */
export default (elements = [], { step = 10, isDebug = false } = {}) => {
  if (!Array.isArray(elements)) return [null];

  const [currentStep, setStep] = useState(step);

  // Reinitialise stepper when the size of the array of elements is modified
  useEffect(() => {
    isDebug && console.log("useScrollStepper === reset step");
    setStep(step);
  }, [elements.length, isDebug, step]);

  const ref = useCallback(
    (node) => {
      const handleObserver = ([observedNode], observer) => {
        if (observedNode.isIntersecting) {
          isDebug &&
            console.log("useScrollStepper === dom element intersected");
          observer.disconnect();
          setStep((currentStep) => currentStep + step);
        }
      };

      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        threshold: 1.0,
      });

      if (node) {
        observer.observe(node);
        isDebug && console.log("useScrollStepper === dom element observed");
      }
    },
    [isDebug, step]
  );

  return [ref, elements.slice(0, currentStep)];
};
