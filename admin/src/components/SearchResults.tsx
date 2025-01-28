import { useState, useEffect } from 'react';
import { Box, EmptyStateLayout, Typography, Grid } from '@strapi/design-system';
import SearchResultsItem from './SearchResultsItem';

const SearchResults = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  if (data?.length === 0) {
    return (
      <Grid.Item padding={2} col={12}>
        <EmptyStateLayout content="No content found" />
      </Grid.Item>
    );
  }

  return (
    <>
      <Grid.Item col={12}>
        <Box paddingLeft={2} paddingTop={2} paddingRight={2} background="neutral100">
          <Typography variant="pi" fontWeight="bold">
            Saved Key-Value Pairs
          </Typography>
        </Box>
      </Grid.Item>

      {data?.map((item, i) => {
        return (
          <SearchResultsItem
            item={item}
            key={i}
            updatePair={props.updatePair}
            deletePair={props.deletePair}
          />
        );
      })}
    </>
  );
};

export default SearchResults;
