import React from "react";

export interface IStat {
  data: Record<string, Record<string, number>>;
}

export const mockData: IStat = {
  data: {
    "a96235a6-77d6-4f90-8e9b-5b2f9742cec2": {
      answerId: 215,
      answerIdw: 196,
      answerId3: 100,
    },
    "645e9481-7c98-48ad-88df-cd3bd1c5e261 ": {
      answerId: 515,
      answerIdw: 96,
      answerId3: 50,
    },
  },
};

const Stat = () => {
  return <div>Stat</div>;
};

export default Stat;
