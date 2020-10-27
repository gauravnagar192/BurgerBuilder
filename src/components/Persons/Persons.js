import React, { useRef } from "react";
import Person from "./Person/Person";
import { useEffect } from "react";

const Persons = (props) => props.persons.map((element, i) => {
  var inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  
    return (
      <Person
        key={element.id}
        name={element.name}
        age={element.age}
        click={() => props.clicked(i)}
      >
        <input
          type="text"
          ref={inputElement}
          onChange={(e) => props.changed(e, element.id)}
          value={element.name}
        />
      </Person>
    );
  });

export default Persons;
