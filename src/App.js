import { useState } from 'react';
import StudentsGroup from './components/StudentsGroup';

function distributeIntoGroups(array, numberOfGroups) {
  const groupsList = Array(numberOfGroups)
    .fill()
    .map(() => []);
  let nextGroupIndex = 0;
  array.forEach((currentElement) => {
    groupsList[nextGroupIndex].push(currentElement);
    nextGroupIndex += 1;
    if (nextGroupIndex >= numberOfGroups) {
      nextGroupIndex = 0;
    }
  });
  return groupsList;
}

function App() {
  const students = [
    'Arthaud',
    'Florence',
    'Solène',
    'Séléna',
    'Pierre',
    'Paul',
    'Jacques',
  ];
  const [numberOfGroups, setNumberOfGroups] = useState(1);
  const groupList = distributeIntoGroups(students, numberOfGroups);

  return (
    <div>
      <label htmlFor="numberOfGroups">
        Number of groups:
        <input
          id="numberOfGroups"
          value={numberOfGroups}
          type="number"
          min="1"
          max={students.length}
          onChange={(event) => {
            const newNumberOfGroups = parseInt(event.target.value, 10);
            setNumberOfGroups(newNumberOfGroups);
          }}
        />
      </label>

      {groupList.map((group, index) => {
        return (
          <StudentsGroup key={group} students={group} groupNumber={index + 1} />
        );
      })}
    </div>
  );
}

export default App;
