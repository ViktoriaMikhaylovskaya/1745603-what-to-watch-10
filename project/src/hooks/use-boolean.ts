import { useState, useMemo } from 'react';

type UseBoolean = [
  boolean,
  {
    setTrue: () => void,
    setFalse: () => void,
    toggle: () => void,
    set: (b: boolean) => void,
  }];

const useBoolean = (initialValue?: boolean): UseBoolean => {
  const [value, setValue] = useState(initialValue ?? false);

  const actions = useMemo(
    () => ({
      setTrue: () => setValue((_) => true),
      setFalse: () => setValue((_) => false),
      toggle: () => setValue((prevValue) => !prevValue),
      set: setValue,
    }),
    []
  );

  return [value, actions];
};

export default useBoolean;
