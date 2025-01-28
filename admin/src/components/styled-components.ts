import { Grid } from "@strapi/design-system";
import styled from "styled-components";

const MainWrapper = styled(Grid.Root)`
  padding: 17px;
`;

const SearchWrapper = styled(Grid.Item)`
  > div {
    width: 100%;
  }
`;

const InputWrapper = styled(Grid.Item)`
  align-items: start;

  > div {
    width: 100%;
  }

  * label ~ div {
    border-style: dashed;
  }
`;

const LayoutCell = styled(Grid.Item)`
  display: flex;
  align-items: end;
`;


export { MainWrapper, InputWrapper, SearchWrapper, LayoutCell };