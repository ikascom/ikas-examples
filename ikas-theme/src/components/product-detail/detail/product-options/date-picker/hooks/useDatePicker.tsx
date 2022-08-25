import { useEffect, useState } from "react";
import { IkasProductOption } from "@ikas/storefront";

import { SET_HOURS } from "..";

function getInitialSelectedDate(option: IkasProductOption) {
  if (!option.dateSettings) return;
  let _minDate: Date | null = new Date();

  if (option.dateSettings.minRelativeNextDate === null) return _minDate;

  if (option.dateSettings.minRelativeNextDate > 0) {
    _minDate.setDate(
      _minDate.getDate() + Math.abs(option.dateSettings.minRelativeNextDate)
    );
  }

  _minDate.setHours(...SET_HOURS);
  return _minDate;
}

type Props = {
  option: IkasProductOption;
};

export default function useDatePicker({ option }: Props) {
  const [minDate, setMinDate] = useState<Date | undefined>();
  const [maxDate, setMaxDate] = useState<Date | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    getInitialSelectedDate(option)
  );

  useEffect(() => {
    if (!option.dateSettings) return;
    let _minDate: Date | null = null;
    let _maxDate: Date | null = null;

    if (option.dateSettings.minRelativeNextDate !== null) {
      _minDate = new Date();
      if (option.dateSettings.minRelativeNextDate < 0) {
        _minDate.setDate(
          _minDate.getDate() - Math.abs(option.dateSettings.minRelativeNextDate)
        );
      } else {
        _minDate.setDate(
          _minDate.getDate() + Math.abs(option.dateSettings.minRelativeNextDate)
        );
      }

      _minDate.setHours(...SET_HOURS);
      setMinDate(_minDate);
    }

    if (option.dateSettings.maxRelativeNextDate !== null) {
      _maxDate = new Date();
      if (option.dateSettings.maxRelativeNextDate < 0) {
        _maxDate.setDate(
          _maxDate.getDate() - Math.abs(option.dateSettings.maxRelativeNextDate)
        );
      } else {
        _maxDate.setDate(
          _maxDate.getDate() + Math.abs(option.dateSettings.maxRelativeNextDate)
        );
      }

      _maxDate.setHours(...SET_HOURS);
      setMaxDate(_maxDate);
    }
  }, [option]);

  const checkAndSetEnteredValueToSelectedDate = (value: string) => {
    const dateValue = new Date(value);
    dateValue.setHours(...SET_HOURS);

    if (!minDate || !maxDate) {
      setSelectedDate(dateValue);
      option.values = [dateValue.toString()];
      return;
    }

    let newValue: Date | undefined = undefined;
    if (minDate) {
      if (dateValue.getTime() < minDate.getTime()) {
        newValue = minDate;
      }
    }

    if (maxDate) {
      if (dateValue.getTime() > maxDate.getTime()) {
        newValue = maxDate;
      }
    }

    if (newValue) {
      setSelectedDate(newValue);
      option.values = [newValue.toString()];
    } else {
      setSelectedDate(dateValue);
      option.values = [dateValue.toString()];
    }
  };

  return {
    minDate,
    maxDate,
    selectedDate,
    checkAndSetEnteredValueToSelectedDate,
  };
}
