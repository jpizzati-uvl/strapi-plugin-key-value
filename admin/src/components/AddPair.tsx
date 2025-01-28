import { useState, useEffect } from "react";
import { Field, Button, TextInput } from "@strapi/design-system";
import { InputWrapper, LayoutCell } from "./styled-components";

const keyRegex = /^[a-zA-Z0-9_-]+$/;
const valueRegex = /.*\S.*/;
const keyRegexError =
  'This "key" does not match the regex. "key" should be an alphanumeric value without spaces.';
const keyExistError =
  'This "key" already exists. Either delete already existing "key" or choose a different one.';

const AddPair = (props) => {
  const [key, setKey] = useState('');
  const [keyExists, setKeyExists] = useState(false);
  const [invalidKey, setInvalidKey] = useState(false);

  const [value, setValue] = useState('');
  const [validationPassed, setValidationPassed] = useState(false);

  const handleKey = (key) => {
    props.showExistingKey(null);
    setInvalidKey(false);
    setKeyExists(false);
    setKey(key);

    if (key && !key.match(keyRegex)) {
      setInvalidKey(true);
    }
  };

  const handleValue = (value) => {
    if (value && value.match(valueRegex)) {
      setValue(value);
    } else {
      setValue('');
    }
  };

  const clearInputs = () => {
    setKey("");
    setValue("");
  };

  const addPair = () => {
    if (props.data?.some((el) => el[0] === key)) {
      props.showExistingKey(key);
      setKeyExists(true);
    } else {
      props.addPair(key, value);
      clearInputs();
    }
  };

  useEffect(() => {
    if (key && !invalidKey && !keyExists) {
      setValidationPassed(true);
    } else {
      setValidationPassed(false);
    }
  }, [key, invalidKey, keyExists]);

  return (
    <>
      <InputWrapper padding={2} col={4} s={12}>
        <Field.Root required error={
          invalidKey
            ? keyRegexError
            : keyExists
              ? keyExistError
              : null
        }>
          <Field.Label>Key</Field.Label>
          <TextInput
            name="key"
            aria-label="key"
            placeholder="Required"
            size="S"
            value={key}
            onChange={(e) => handleKey(e.target.value)}
          />
          <Field.Error />
        </Field.Root>
      </InputWrapper>

      <InputWrapper padding={2} s={10} col={6}>
        <Field.Root>
          <Field.Label>Value</Field.Label>
          <TextInput
            name="value"
            aria-label="value"
            placeholder="Optional"
            size="S"
            value={value}
            onChange={(e) => handleValue(e.target.value)}
          />
        </Field.Root>
      </InputWrapper>

      <LayoutCell padding={2} xs={2}>
        {!(invalidKey || keyExists) && (
          <Button disabled={!validationPassed} fullWidth onClick={addPair}>
            Add
          </Button>
        )}
      </LayoutCell>
    </>
  );
};

export default AddPair;
