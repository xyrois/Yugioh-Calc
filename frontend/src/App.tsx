import { useState } from "react";
import { api } from "./api";

interface Requirement {
  name: string;
  copies: number | "";
  min: number | "";
  max: number | "";
}

interface AnalysisResult {
  going_first: number;
  going_second: number;
}

function App() {
  const [deckSize, setDeckSize] =
    useState<number | "">(40);

  const [handSize, setHandSize] =
    useState<number | "">(5);

  const [goingSecond, setGoingSecond] =
    useState(false);

  const [requirements, setRequirements] =
    useState<Requirement[]>([
      {
        name: "",
        copies: "",
        min: "",
        max: "",
      },
    ]);

  const [results, setResults] =
    useState<AnalysisResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  function addRequirement() {
    setRequirements([
      ...requirements,
      {
        name: "",
        copies: "",
        min: "",
        max: "",
      },
    ]);
  }

  function removeRequirement(index: number) {
    setRequirements(
      requirements.filter(
        (_, i) => i !== index
      )
    );
  }

  function updateRequirement(
    index: number,
    field: keyof Requirement,
    value: string | number
  ) {
    const updated = [...requirements];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setRequirements(updated);
  }

  async function analyze() {
    try {
      setLoading(true);

      const response =
        await api.post(
          "/analyze",
          {
            deck_size:
              deckSize === ""
                ? null
                : deckSize,

            hand_size:
              handSize === ""
                ? null
                : handSize,

            requirements:
              requirements.map(
                (r) => ({
                  ...r,
                  copies:
                    Number(
                      r.copies
                    ),
                  min:
                    Number(
                      r.min
                    ),
                  max:
                    Number(
                      r.max
                    ),
                })
              ),
          }
        );

      setResults(
        response.data
      );

    } catch {
      alert(
        "Calculation failed."
      );
    }

    setLoading(false);
  }

  return (
    <div className="page">

      <div className="card">

        <h1>
          Yu-Gi-Oh Opening Hand Calculator
        </h1>

        <p className="subtitle">
          Calculate your chance
          of opening the exact
          hand you want.
        </p>

        <div className="headers">

          <span>
            Card Name
          </span>

          <span>
            Copies
          </span>

          <span>
            Min
          </span>

          <span>
            Max
          </span>

          <span></span>

        </div>

        <div className="requirements">

          {requirements.map(
            (
              req,
              index
            ) => (
              <div
                key={
                  index
                }
                className="requirement"
              >

                <input
                  placeholder="Starter"
                  value={
                    req.name
                  }
                  onChange={(
                    e
                  ) =>
                    updateRequirement(
                      index,
                      "name",
                      e.target
                        .value
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="3"
                  value={
                    req.copies
                  }
                  onChange={(
                    e
                  ) =>
                    updateRequirement(
                      index,
                      "copies",
                      e.target
                        .value ===
                      ""
                        ? ""
                        : Number(
                            e
                              .target
                              .value
                          )
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="1"
                  value={
                    req.min
                  }
                  onChange={(
                    e
                  ) =>
                    updateRequirement(
                      index,
                      "min",
                      e.target
                        .value ===
                      ""
                        ? ""
                        : Number(
                            e
                              .target
                              .value
                          )
                    )
                  }
                />

                <input
                  type="number"
                  placeholder="3"
                  value={
                    req.max
                  }
                  onChange={(
                    e
                  ) =>
                    updateRequirement(
                      index,
                      "max",
                      e.target
                        .value ===
                      ""
                        ? ""
                        : Number(
                            e
                              .target
                              .value
                          )
                    )
                  }
                />

                <button
                  className="remove"
                  onClick={() =>
                    removeRequirement(
                      index
                    )
                  }
                >
                  —
                </button>

              </div>
            )
          )}

        </div>

        <div
          style={{
            display:
              "flex",
            justifyContent:
              "flex-end",
            marginTop:
              48,
          }}
        >

          <div
            style={{
              width:
                "520px",
            }}
          >

            <div
              className="settings"
            >

              <div>

                <label>
                  Hand Size
                </label>

                <input
                  type="number"
                  value={
                    handSize
                  }
                  onChange={(
                    e
                  ) =>
                    setHandSize(
                      e
                        .target
                        .value ===
                        ""
                        ? ""
                        : Number(
                            e
                              .target
                              .value
                          )
                    )
                  }
                />

              </div>

              <div>

                <label>
                  Deck Size
                </label>

                <input
                  type="number"
                  value={
                    deckSize
                  }
                  onChange={(
                    e
                  ) =>
                    setDeckSize(
                      e
                        .target
                        .value ===
                        ""
                        ? ""
                        : Number(
                            e
                              .target
                              .value
                          )
                    )
                  }
                />

              </div>

            </div>

            <label
              style={{
                display:
                  "flex",
                justifyContent:
                  "flex-end",
                gap: 8,
                marginTop:
                  14,
              }}
            >
              <input
                type="checkbox"
                checked={
                  goingSecond
                }
                onChange={() =>
                  setGoingSecond(
                    !goingSecond
                  )
                }
              />

              Going Second
              (+1 card)

            </label>

          </div>

        </div>

        <div
          className="buttons"
        >

          <button
            onClick={
              addRequirement
            }
          >
            + Add
          </button>

          <button
            onClick={
              analyze
            }
          >
            {loading
              ? "Calculating..."
              : "Analyze"}
          </button>

        </div>

        {results && (

          <div className="results">

            <h2>
              Results
            </h2>

            <p>
              You have a{" "}
              <strong>
                {
                  results.going_first
                }
                %
              </strong>{" "}
              chance to open
              this hand
              going first.
            </p>

            {goingSecond && (
              <p
                style={{
                  marginTop:
                    20,
                }}
              >
                You have a{" "}
                <strong
                  style={{
                    color:
                      "#60a5fa",
                  }}
                >
                  {
                    results.going_second
                  }
                  %
                </strong>{" "}
                chance to open
                this hand
                going second.
              </p>
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default App;