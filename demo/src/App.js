import "./App.css";
import useScrollStepper from "@sankluj/load-as-you-scroll";

function App() {
  const elements = [...Array(5000)];
  const [scrollStepperNode, displayedElts] = useScrollStepper(elements);

  return (
    <div className="App">
      {displayedElts.map((_, index) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "60vw",
              height: "150px",
              background: "red",
              marginTop: "18px",
            }}
          >
            {index} of {elements.length}
          </div>
          {displayedElts.length - index === 4 && (
            <span ref={scrollStepperNode}>here</span>
          )}
        </>
      ))}
    </div>
  );
}

export default App;
