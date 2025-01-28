import { useState } from "react";
import { Field, TextInput, Button } from "@strapi/design-system";
import { LayoutCell, SearchWrapper } from "./styled-components";

const SearchRequest = (props: any) => {
  const [searchString, setSearchString] = useState<string | null>('');

  const searchRequest = (search: string) => {
    setSearchString(search);
    props.searchRequest(search);
  };

  return (
    <>
      <SearchWrapper padding={2} xs={10}>
        <Field.Root>
          <Field.Label>Search</Field.Label>
          <TextInput
            name="search"
            type="text"
            aria-label="search"
            placeholder="Type to search..."
            size="S"
            value={searchString}
            onChange={(e: any) => searchRequest(e.target.value)}
          />
        </Field.Root>
      </SearchWrapper>

      <LayoutCell padding={2} xs={2}>
        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            searchRequest("");
          }}
        >
          Clear
        </Button>
      </LayoutCell>
    </>
  );
};

export default SearchRequest;
