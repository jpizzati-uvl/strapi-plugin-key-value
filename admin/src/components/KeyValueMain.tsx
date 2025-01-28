import { useState, useEffect } from 'react';
import AddPair from './AddPair';
import SearchPair from './SearchPair';
import { MainWrapper } from './styled-components';

export default function KeyValueMain({ attribute, error, name, onChange, value }) {
  const [data, setData] = useState([]);
  const [existingKey, setExistingKey] = useState('');
  const [hightlightSaveButton, setHightlightSaveButton] = useState(false);

  const parseValue = (value) => {
    try {
      setData(Object.entries(value || data));
      setHightlightSaveButton(false);
    } catch (error) {
      console.log('There are some problems with parsing data', error);
    }
  };

  const showExistingKey = (key) => {
    setExistingKey(key);
  };

  const addPair = (key, value) => {
    const dataNew = [...data];

    dataNew.push([key, value]);

    setData(dataNew);
    setHightlightSaveButton(true);
  };

  const deletePair = (oldKey, newKey, oldValue) => {
    const dataNew = [...data];
    const index = dataNew?.findIndex((el) => el[0] === oldKey);

    if (newKey && oldValue) {
      dataNew.splice(index, 1, [newKey, oldValue]);
    } else {
      dataNew.splice(index, 1);
    }

    setData(dataNew);
    setHightlightSaveButton(true);
  };

  const updatePair = (oldKey, newValue) => {
    const dataNew = [...data];
    const index = dataNew?.findIndex((el) => el[0] === oldKey);

    dataNew[index] = [oldKey, newValue];

    setData(dataNew);
    setHightlightSaveButton(true);
  };

  useEffect(() => {
    if (value) {
      parseValue(value);
    }
  }, []);

  useEffect(() => {
    if (hightlightSaveButton) {
      onChange({
        target: {
          name,
          value: JSON.stringify(Object.fromEntries(data)),
          type: attribute.type,
        },
      });
    }
  }, [data, hightlightSaveButton]);

  useEffect(() => {
    error && console.log('error', error);
  }, [error]);

  return (
    <MainWrapper background="neutral100">
      <AddPair data={data} addPair={addPair} showExistingKey={showExistingKey} />
      <SearchPair
        data={data}
        existingKey={existingKey}
        updatePair={updatePair}
        deletePair={deletePair}
      />
    </MainWrapper>
  );
};
