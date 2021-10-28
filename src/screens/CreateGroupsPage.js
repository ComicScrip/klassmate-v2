import _ from 'lodash';
import axios from 'axios';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from '@material-ui/core';
import { CircularProgress } from '@mui/material';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useState, useEffect } from 'react';
import KlassmateAPI from '../KlassmateAPI';

import GroupList from '../components/GroupList';

function makeGroups(array, numberOfGroups) {
  const groups = new Array(numberOfGroups).fill().map(() => []);
  let currentGroupIndex = 0;
  array.forEach((item) => {
    groups[currentGroupIndex].push(item);
    currentGroupIndex += 1;
    if (currentGroupIndex === groups.length) currentGroupIndex = 0;
  });
  return groups;
}

export default function CreateGroupsPage() {
  const [students, setStudents] = useState([]);
  const [numberOfGroupsToCreate, setNumberOfGroupsToCreate] = useState(2);
  const [groupList, setGroupList] = useState(
    makeGroups(students, numberOfGroupsToCreate)
  );
  const [randomizationActivited, setRandomizationActivated] = useState(true);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const validNumberOfGroups = new Array(students.length)
    .fill()
    .map((el, i) => i + 1)
    .map((n) => (
      <MenuItem key={n} value={n}>
        {n}
      </MenuItem>
    ));

  const safelyChangeNumberOfGroups = (newValue) => {
    const parsed = parseInt(newValue, 10);
    if (parsed > 0 && parsed <= students.length)
      setNumberOfGroupsToCreate(parsed);
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    setStudentsLoading(true);

    KlassmateAPI.get('/students', { cancelToken: source.token })
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setStudentsLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const studentList = randomizationActivited ? _.shuffle(students) : students;
    setGroupList(makeGroups(studentList, numberOfGroupsToCreate));
  }, [students, numberOfGroupsToCreate, randomizationActivited]);

  if (studentsLoading) return <CircularProgress />;
  if (students.length === 0)
    return (
      <div>
        At least 2 students must be registered to make groups, invite people to
        start making groups
      </div>
    );

  return (
    <>
      <h2 className="text-center text-3xl">Create groups</h2>
      <div className="text-center">
        <p className="text-xl">
          with <em>{students.length}</em> students
        </p>
        <form className="p-5 m-3.5 mb-5">
          <IconButton
            onClick={() =>
              safelyChangeNumberOfGroups(numberOfGroupsToCreate - 1)
            }
            aria-label="decrement number of groups"
          >
            <RemoveIcon />
          </IconButton>
          <FormControl style={{ minWidth: 140 }}>
            <InputLabel
              style={{ position: 'relative', left: '17px' }}
              id="numberOfGroups"
            >
              Number of groups
            </InputLabel>
            <Select
              labelId="numberOfGroups"
              id="numberOfGroups"
              value={validNumberOfGroups.length ? numberOfGroupsToCreate : ''}
              onChange={(e) => safelyChangeNumberOfGroups(e.target.value)}
            >
              {validNumberOfGroups}
            </Select>
          </FormControl>
          <IconButton
            onClick={() =>
              safelyChangeNumberOfGroups(numberOfGroupsToCreate + 1)
            }
            aria-label="incrment number of groups"
          >
            <AddIcon />
          </IconButton>
          <div className="mt-8">
            <FormControlLabel
              control={
                <Switch
                  checked={randomizationActivited}
                  onChange={(e) => setRandomizationActivated(e.target.checked)}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              labelPlacement="start"
              label="Randomization"
            />
          </div>
        </form>
        <GroupList groups={groupList} />
      </div>
    </>
  );
}
