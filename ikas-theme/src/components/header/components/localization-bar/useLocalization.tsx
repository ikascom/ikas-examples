import React, { useState, useEffect } from "react";
import { IkasLocaleOption, useStore } from "@ikas/storefront";

import { SelectOnChangeParamType } from "src/components/components/select";

export default function useLocalization() {
  const store = useStore();
  const [showLocaleBar, setShowLocaleBar] = useState(store.showLocaleOptions);
  const [selectedLocalization, setSelectedLocalization] = useState<
    IkasLocaleOption | undefined
  >(undefined);

  const onLocaleChange = (value: SelectOnChangeParamType) => {
    const option = store.localeOptions.find((l) => l.id === value);
    setSelectedLocalization(option);
  };

  const onButtonClick = () => {
    selectedLocalization && store.setLocalization(selectedLocalization);
  };

  const onCloseClick = () => {
    setShowLocaleBar(false);
  };

  useEffect(() => {
    setSelectedLocalization(store.localeOptions.find((l) => l.isRecommended));
  }, [store.localeOptions]);

  useEffect(() => {
    setShowLocaleBar(store.showLocaleOptions);
  }, [store.showLocaleOptions]);

  const options = store.localeOptions.map((lO) => ({
    label: lO.countryName || "Other Countries",
    value: lO.id,
  }));

  return {
    showLocaleBar,
    selectedLocalization,
    options,
    onLocaleChange,
    onButtonClick,
    onCloseClick,
  };
}
