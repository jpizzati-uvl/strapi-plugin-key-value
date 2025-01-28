
import { useState, useEffect } from "react";
import { TextInput, Button } from "@strapi/design-system";
import { Field } from '@strapi/design-system';
import { InputWrapper, LayoutCell } from "./styled-components";

const keyRegex = /^[a-zA-Z0-9_-]+$/;
const valueRegex = /.*\S.*/;
const keyRegexError =
  'This "key" does not match the regex. "key" should be an alphanumeric value without spaces.';
const keyEmptyError = '"key" cannot be empty.';

const SearchResultsItem = (props) => {
  const [key, setKey] = useState(props.item[0]);
  const [invalidKey, setInvalidKey] = useState(false);
  const [emptyKey, setEmptyKey] = useState(false);

  const [value, setValue] = useState(props.item[1]);

  const updateKey = (newKey) => {
    setInvalidKey(false);
    setEmptyKey(false);

    if (newKey) {
      if (newKey.match(keyRegex)) {
        setKey(newKey);
        props.updatePair(key, newKey, value, undefined);
      } else {
        setInvalidKey(true);
      }
    } else {
      setEmptyKey(true);
    }
  };

  const updateValue = (newValue) => {
    if (newValue && newValue.match(valueRegex)) {
      const sanitizedValue = newValue.replace(/^\s+|\s+$/g, "");

      setValue(sanitizedValue);
      props.updatePair(key, undefined, value, sanitizedValue);
    } else {
      setValue(null);
      props.updatePair(key, undefined, value, null);
    }
  };

  const deletePair = () => {
    props.deletePair(key);
  };

  useEffect(() => {
    setKey(props.item[0]);
    setValue(props.item[1]);
  }, [props.item[0], props.item[1]]);

  return (
    <>
      <InputWrapper padding={2} col={4} s={12}>
        <Field.Root error={
          invalidKey ? keyRegexError : emptyKey ? keyEmptyError : null
        }>
          <TextInput
            disabled
            name="key"
            aria-label="key"
            size="S"
            value={key}
            onChange={(e) => updateKey(e.target.value)}
            onBlur={(e) => updateKey(e.target.value)}

          />
          <Field.Error />
        </Field.Root>
      </InputWrapper>
      <InputWrapper padding={2} s={10} col={6}>
        <TextInput
          name="value"
          aria-label="value"
          placeholder="Optional"
          size="S"
          value={value}
          onChange={(e) => updateValue(e.target.value)}
        />
      </InputWrapper>

      <LayoutCell padding={2} xs={2}>
        {!(invalidKey || emptyKey) && (
          <Button variant="danger" fullWidth onClick={deletePair}>
            Delete
          </Button>
        )}
      </LayoutCell>
    </>
  );
};

export default SearchResultsItem;
