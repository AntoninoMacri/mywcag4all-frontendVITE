import * as React from "react";

export default function Title(props) {
  return (
    <div className={"w-100 text-center"}>
      <h2 className="bold7">{props.title}</h2>
    </div>
  );
}
