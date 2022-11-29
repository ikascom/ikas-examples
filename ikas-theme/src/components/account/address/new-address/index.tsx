import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasAddressForm,
  useTranslation,
  AddressFormItem,
} from "@ikas/storefront";

import Button from "src/components/components/button";
import Input from "src/components/components/input";
import Select from "src/components/components/select";
import Form from "src/components/components/form";
import FormItem, {
  FormItemStatus,
} from "src/components/components/form/form-item";
import Row from "src/components/components/grid/row";
import Col, { ColumnProps } from "src/components/components/grid/col";
import Loading from "../../components/loading";
import { Loading as LoadingSVG } from "src/components/components/button/index";

import { NS } from "src/components/account";

type Props = {
  addressForm: IkasAddressForm;
  onSave: () => Promise<void>;
};

const NewAddress = ({ addressForm, ...props }: Props) => {
  const { t } = useTranslation();
  const [isPending, setPending] = useState(false);

  const onSubmit = async () => {
    setPending(true);
    await props.onSave();
    setPending(false);
  };

  if (!addressForm.isLoaded) {
    return (
      <Loading>
        <LoadingSVG />
      </Loading>
    );
  }

  const titleLabel = `*${t(`${NS}:address.form.title`)}`;
  const titleStatus = addressForm.validationResult?.title.hasError
    ? "error"
    : undefined;

  const renderFormItem = (item: AddressFormItem) => {
    const required = !!(addressForm?.fieldSettings || {})[item]?.required;

    const placeholder =
      (addressForm?.fieldLabels || {})[item]?.placeholder ||
      t(`${NS}:address.form.placeholder.${item}`);

    const status: FormItemStatus | undefined =
      ((addressForm?.validationResult as any) || {})[item]?.hasError
        ? "error"
        : undefined;

    let children: React.ReactNode;
    switch (item) {
      case AddressFormItem.ADDRESS_LINE_1: {
        children = (
          <Input
            required={required}
            placeholder={placeholder}
            status={status}
            value={addressForm.address.addressLine1 || ""}
            onChange={(event) =>
              addressForm.onAddressLine1Change(event?.target.value)
            }
          />
        );
        break;
      }
      case AddressFormItem.ADDRESS_LINE_2: {
        children = (
          <Input
            required={required}
            placeholder={placeholder}
            status={status}
            value={addressForm.address.addressLine2 || ""}
            onChange={(event) =>
              addressForm.onAddressLine2Change(event?.target.value)
            }
          />
        );
        break;
      }
      case AddressFormItem.CITY: {
        children = (
          <>
            {addressForm.isFreeTextCity && (
              <Input
                required={required}
                placeholder={placeholder}
                status={status}
                value={addressForm.address.city?.name || ""}
                onChange={(event) =>
                  addressForm.onCityInputChange(event?.target.value)
                }
              />
            )}
            {!addressForm.isFreeTextCity && (
              <Select
                required={required}
                placeholder={placeholder}
                disabled={addressForm.isCitiesPending}
                status={status}
                value={addressForm.address.city?.id || ""}
                options={addressForm.cityOptions}
                onChange={(value) => addressForm.onCityChange(value as string)}
              />
            )}
          </>
        );
        break;
      }
      case AddressFormItem.COUNTRY: {
        children = (
          <Select
            required={required}
            placeholder={placeholder}
            disabled={addressForm.isCountriesPending}
            status={status}
            value={addressForm.address.country?.id || ""}
            options={addressForm.countryOptions}
            onChange={(value) => addressForm.onCountryChange(value as string)}
          />
        );
        break;
      }
      case AddressFormItem.DISTRICT: {
        children = (
          <>
            {addressForm.isFreeTextDistrict && (
              <Input
                required={required}
                placeholder={placeholder}
                status={status}
                value={addressForm.address.district?.name || ""}
                onChange={(event) =>
                  addressForm.onDistrictInputChange(event.target.value)
                }
              />
            )}
            {!addressForm.isFreeTextDistrict && (
              <Select
                required={required}
                status={status}
                placeholder={placeholder}
                disabled={addressForm.isDistrictsPending}
                value={addressForm.address.district?.id || ""}
                options={addressForm.districtOptions}
                onChange={(value) =>
                  addressForm.onDistrictChange(value as string)
                }
              />
            )}
          </>
        );
        break;
      }
      case AddressFormItem.FIRSTNAME: {
        children = (
          <Input
            required={required}
            placeholder={placeholder}
            status={status}
            value={addressForm.address.firstName || ""}
            onChange={(event) =>
              addressForm.onFirstNameChange(event.target.value)
            }
          />
        );
        break;
      }
      case AddressFormItem.LASTNAME: {
        children = (
          <Input
            required={required}
            placeholder={placeholder}
            status={status}
            value={addressForm.address.lastName || ""}
            onChange={(event) =>
              addressForm.onLastNameChange(event.target.value)
            }
          />
        );
        break;
      }
      case AddressFormItem.PHONE: {
        children = (
          <Input
            required={required}
            placeholder={placeholder}
            status={status}
            value={addressForm.address.phone || ""}
            onChange={(event) => addressForm.onPhoneChange(event.target.value)}
          />
        );
        break;
      }

      case AddressFormItem.POSTAL_CODE: {
        children = (
          <Input
            required={required}
            status={status}
            placeholder={placeholder}
            value={addressForm.address.postalCode || ""}
            onChange={(event) =>
              addressForm.onAddressPostalCodeChange(event.target.value)
            }
          />
        );
        break;
      }
      case AddressFormItem.STATE: {
        children = (
          <Select
            required={required}
            placeholder={placeholder}
            disabled={addressForm.isStatesPending}
            status={status}
            value={addressForm.address.state?.id || ""}
            options={addressForm.stateOptions}
            onChange={(value) => addressForm.onStateChange(value as string)}
          />
        );
        break;
      }
    }

    const formItemLabel =
      (addressForm.fieldLabels || {})[item]?.label ||
      t(`${NS}:address.form.${item}`);
    const formItemHelp = ((addressForm?.validationResult as any) || {})[item]
      ?.message;
    return (
      <FormItem
        label={(required ? "*" : "") + formItemLabel}
        help={formItemHelp}
        status={status}
      >
        {children}
      </FormItem>
    );
  };

  const renderFormRow = (formRow: AddressFormItem[], index: number) => {
    const grid = formRow.length;
    if (!formRow.length) return null;
    return (
      <Row key={index} gutter={24}>
        {formRow.map((formRow, formRowIndex) => (
          <Col
            key={formRowIndex}
            sm={24}
            span={(24 / grid) as ColumnProps["span"]}
          >
            {renderFormItem(formRow)}
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormItem
        label={titleLabel}
        help={addressForm.validationResult?.title.message}
        status={titleStatus}
      >
        <Input
          required
          placeholder={t(`${NS}:address.form.placeholder.title`)}
          status={titleStatus}
          value={addressForm.address.title || ""}
          onChange={(event) => addressForm.onTitleChange(event.target.value)}
        />
      </FormItem>
      {addressForm.addressFormat?.map(renderFormRow)}
      <div>
        <Button loading={isPending} onClick={onSubmit}>
          {t(`${NS}:address.save`)}
        </Button>
      </div>
    </Form>
  );
};

export default observer(NewAddress);
