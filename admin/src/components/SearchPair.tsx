import { useState, useEffect } from 'react';
import { EmptyStateLayout, Grid } from '@strapi/design-system';
import SearchRequest from './SearchRequest';
import SearchResults from './SearchResults';

const SearchPair = (props: any) => {
  const [filteredData, setFilteredData] = useState(props.data);

  const searchRequest = (search: string) => {
    if (!search) {
      setFilteredData(props.data);
    } else {
      const results = props.data.filter((el: string) => {
        return el[0].includes(search);
      });

      setFilteredData(results);
    }
  };

  const filterByExistingKey = (key: string) => {
    const index = props.data?.findIndex((el: any) => el[0] === key);

    if (index > -1) {
      setFilteredData([props.data[index]]);
    } else {
      setFilteredData(props.data);
    }
  };

  useEffect(() => {
    setFilteredData(props.data);
  }, [props.data]);

  useEffect(() => {
    filterByExistingKey(props.existingKey);
  }, [props.data, props.existingKey]);

  if (props.data === null || props?.data.length === 0) {
    return (
      <Grid.Item padding={2} col={12}>
        <div style={{ width: '100%' }}>
          <EmptyStateLayout content="No entry yet" />
        </div>
      </Grid.Item>
    );
  }

  return (
    <>
      {!props.existingKey && <SearchRequest searchRequest={searchRequest}></SearchRequest>}
      <SearchResults
        data={filteredData}
        updatePair={props.updatePair}
        deletePair={props.deletePair}
      />
    </>
  );
};

export default SearchPair;
