import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { AddressForm, useTranslation } from "@ikas/storefront";

import Button from "src/components/components/button";
import Input from "src/components/components/input";
import Select from "src/components/components/select";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";

import { NS } from "src/components/account";
import Row from "src/components/components/grid/row";
import Col from "src/components/components/grid/col";

type Props = {
  addressForm: AddressForm;
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

  return (
    <Form onSubmit={onSubmit}>
      <FormItem
        label={t(`${NS}:address.form.title`)}
        help={addressForm.results.title.errorMessage}
        status={addressForm.results.title.status}
      >
        <Input
          required
          placeholder={t(`${NS}:address.form.titlePlaceholder`)}
          status={addressForm.results.title.status}
          value={addressForm.address.title || ""}
          onChange={(event) => addressForm.onTitleChange(event.target.value)}
        />
      </FormItem>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem
            label={t(`${NS}:address.form.firstName`)}
            help={addressForm.results.firstName.errorMessage}
            status={addressForm.results.firstName.status}
          >
            <Input
              required
              placeholder={t(`${NS}:address.form.firstName`)}
              status={addressForm.results.firstName.status}
              value={addressForm.address.firstName || ""}
              onChange={(event) =>
                addressForm.onFirstNameChange(event.target.value)
              }
            />
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem
            label={t(`${NS}:address.form.lastName`)}
            help={addressForm.results.lastName.errorMessage}
            status={addressForm.results.lastName.status}
          >
            <Input
              required
              placeholder={t(`${NS}:address.form.lastName`)}
              status={addressForm.results.lastName.status}
              value={addressForm.address.lastName || ""}
              onChange={(event) =>
                addressForm.onLastNameChange(event.target.value)
              }
            />
          </FormItem>
        </Col>
      </Row>
      <FormItem
        label={t(`${NS}:address.form.addressLine1`)}
        help={addressForm.results.addressLine1.errorMessage}
        status={addressForm.results.addressLine1.status}
      >
        <Input
          required
          placeholder={t(`${NS}:address.form.addressLine1`)}
          status={addressForm.results.addressLine1.status}
          value={addressForm.address.addressLine1 || ""}
          onChange={(event) =>
            addressForm.onAddressLine1Change(event?.target.value)
          }
        />
      </FormItem>
      <FormItem label={t(`${NS}:address.form.addressLine2`)}>
        <Input
          placeholder={t(`${NS}:address.form.addressLine2`)}
          value={addressForm.address.addressLine2 || ""}
          onChange={(event) =>
            addressForm.onAddressLine2Change(event.target.value)
          }
        />
      </FormItem>
      <FormItem label={t(`${NS}:address.form.postalCode`)}>
        <Input
          placeholder={t(`${NS}:address.form.postalCode`)}
          value={addressForm.address.postalCode || ""}
          onChange={(event) =>
            addressForm.onAddressPostalCodeChange(event.target.value)
          }
        />
      </FormItem>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormItem
            label={t(`${NS}:address.form.country`)}
            help={addressForm.results.country.errorMessage}
            status={addressForm.results.country.status}
          >
            <Select
              required
              placeholder={t(`${NS}:address.form.country`)}
              disabled={addressForm.isCountriesPending}
              status={addressForm.results.country.status}
              value={addressForm.address.country?.id || ""}
              options={addressForm.countryOptions}
              onChange={(value) => addressForm.onCountryChange(value as string)}
            />
          </FormItem>
        </Col>
        {addressForm.hasState && (
          <Col span={12}>
            <FormItem
              label={t(`${NS}:address.form.state`)}
              help={addressForm.results.state.errorMessage}
              status={addressForm.results.state.status}
            >
              <Select
                required
                placeholder={t(`${NS}:address.form.state`)}
                disabled={addressForm.isStatesPending}
                status={addressForm.results.state.status}
                value={addressForm.address.state?.id || ""}
                options={addressForm.stateOptions}
                onChange={(value) => addressForm.onStateChange(value as string)}
              />
            </FormItem>
          </Col>
        )}
        <Col span={12}>
          <FormItem
            label={t(`${NS}:address.form.city`)}
            help={addressForm.results.city.errorMessage}
            status={addressForm.results.city.status}
          >
            <Select
              required
              placeholder={t(`${NS}:address.form.city`)}
              disabled={addressForm.isCitiesPending}
              status={addressForm.results.city.status}
              value={addressForm.address.city?.id || ""}
              options={addressForm.cityOptions}
              onChange={(value) => addressForm.onCityChange(value as string)}
            />
          </FormItem>
        </Col>

        <Col span={12}>
          {addressForm.districtOptions.length ? (
            <FormItem label={t(`${NS}:address.form.district`)}>
              <Select
                placeholder={t(`${NS}:address.form.district`)}
                disabled={addressForm.isDistrictsPending}
                value={addressForm.address.district?.id || ""}
                options={addressForm.districtOptions}
                onChange={(value) =>
                  addressForm.onDistrictChange(value as string)
                }
              />
            </FormItem>
          ) : (
            <FormItem label={t(`${NS}:address.form.district`)}>
              <Input
                placeholder={t(`${NS}:address.form.district`)}
                value={addressForm.address.district?.name || ""}
                onChange={(event) =>
                  addressForm.onDistrictInputChange(event.target.value)
                }
              />
            </FormItem>
          )}
        </Col>
      </Row>
      <FormItem
        label={t(`${NS}:address.form.phone`)}
        help={addressForm.results?.phone?.errorMessage}
        status={addressForm.results?.phone?.status}
      >
        <Input
          placeholder={t(`${NS}:address.form.phone`)}
          status={addressForm.results?.phone?.status}
          value={addressForm.address.phone || ""}
          onChange={(event) => addressForm.onPhoneChange(event.target.value)}
        />
      </FormItem>
      <div>
        <Button loading={isPending} onClick={onSubmit}>
          {t(`${NS}:address.save`)}
        </Button>
      </div>
    </Form>
  );
};

export default observer(NewAddress);
