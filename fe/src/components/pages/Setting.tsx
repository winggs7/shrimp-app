import React, { useState } from "react";
import ShrimpButton from "../base/ShrimpButton";
import SetStatRange from "../form/SetStatRange";

export interface Props {
  user: any;
}

export default function Setting({ user }: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  return (
    <>
      <div className="setting-container">
        <ShrimpButton title={"set start"} onClick={() => setIsOpenForm(true)} />
        <div className="title">Information about Shrimp's enviroment</div>
        <div className="">
          The environment for shrimp is crucial for their health and overall
          well-being. Four key attributes that significantly impact shrimp are
          temperature, pH, dissolved oxygen (DO), and nitrate levels. Let's
          explore each attribute and discuss the suitable values for shrimp.
          <ol>
            <li>
              <strong>Temperature</strong>: Shrimp are ectothermic organisms,
              meaning their body temperature is influenced by the surrounding
              environment. The suitable temperature for shrimp varies depending
              on the species, but generally falls within the range of 20°C to
              30°C (68°F to 86°F). It's important to maintain a stable
              temperature within this range to support optimal growth,
              metabolism, and overall physiological functions of the shrimp.
            </li>
            <li>
              <strong>pH</strong>: pH refers to the acidity or alkalinity of the
              water. Shrimp thrive in slightly alkaline to neutral pH
              conditions. The suitable pH range for most shrimp species is
              typically between 7.0 and 8.5. Maintaining the appropriate pH
              level is crucial for proper enzyme function, nutrient absorption,
              and osmoregulation in shrimp.
            </li>
            <li>
              <strong>Dissolved Oxygen (DO)</strong>: Shrimp require an adequate
              supply of dissolved oxygen in the water for respiration. The
              suitable dissolved oxygen levels for shrimp typically range
              between 5 mg/L to 8 mg/L, although some species may tolerate lower
              or higher levels. Insufficient oxygen can lead to stress, reduced
              growth, and increased susceptibility to diseases, while excessive
              levels can also be detrimental. Proper aeration and water
              circulation are necessary to maintain optimal DO levels in shrimp
              ponds or tanks.
            </li>
            <li>
              <strong>Nitrate</strong>: Nitrate is a form of nitrogen that can
              accumulate in the water due to organic waste and excess feeding.
              High nitrate levels can be harmful to shrimp and may result in
              poor growth, weakened immune systems, and increased susceptibility
              to diseases. It is advisable to keep nitrate levels below 50 mg/L,
              and ideally, below 20 mg/L, through efficient filtration, regular
              water exchange, and appropriate feeding practices.
            </li>
          </ol>
          It's important to note that these suitable values can vary depending
          on the specific shrimp species and local environmental conditions.
          Regular monitoring and adjustments should be made to maintain optimal
          conditions for the particular shrimp being cultivated, ensuring their
          health, growth, and productivity.
        </div>
        <div className="warning">
          *All the above information is my own research, so it may be wrong
        </div>
      </div>
      {isOpenForm && (
        <SetStatRange user={user} open={isOpenForm} setOpen={setIsOpenForm} />
      )}
    </>
  );
}
