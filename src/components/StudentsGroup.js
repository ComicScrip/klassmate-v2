import React from 'react';

const StudentsGroup = ({ students, groupNumber }) => (
  <div className="m-12">
    <p>Groupe {groupNumber} </p>
    <ul>
      {students.map((studentName) => {
        return <li key={studentName}>{studentName}</li>;
      })}
    </ul>
  </div>
);

export default StudentsGroup;
