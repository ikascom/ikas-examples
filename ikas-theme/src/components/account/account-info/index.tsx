import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import Button from "src/components/components/button";
import Header from "../components/header";

import useAccountInfo from "./useAccountInfo";

import { NS } from "../index";

export const AccountInfo = observer(() => {
  const { t } = useTranslation();
  const { pending, formAlert, status, accountInfoForm, onSubmit } =
    useAccountInfo();

  if (!accountInfoForm) return null;
  return (
    <div>
      <Header title={t(`${NS}:menu.accountInfo`)} />
      {formAlert && (
        <Alert
          closable
          status={formAlert.status}
          title={formAlert.title}
          text={formAlert.text}
        />
      )}
      <Form onSubmit={onSubmit}>
        <FormItem
          label={t(`${NS}:accountInfo.form.firstName`)}
          help={accountInfoForm.firstNameErrorMessage}
          status={status.firstName}
        >
          <Input
            status={status.firstName}
            value={accountInfoForm.firstName}
            onChange={(event) =>
              accountInfoForm.onFirstNameChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem
          label={t(`${NS}:accountInfo.form.lastName`)}
          help={accountInfoForm.lastNameErrorMessage}
          status={status.lastName}
        >
          <Input
            status={status.lastName}
            value={accountInfoForm.lastName}
            onChange={(event) =>
              accountInfoForm.onLastNameChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem
          help={accountInfoForm.phoneErrorMessage}
          status={status.phone}
          label={t(`${NS}:accountInfo.form.phone`)}
        >
          <Input
            status={status.phone}
            value={accountInfoForm.phone}
            onChange={(event) =>
              accountInfoForm.onPhoneChange(event.target.value)
            }
          />
        </FormItem>
        <FormItem label={t(`${NS}:accountInfo.form.email`)}>
          <Input disabled value={accountInfoForm.email || ""} />
        </FormItem>
        <Button type="submit" loading={pending} disabled={pending}>
          {t(`${NS}:accountInfo.form.save`)}
        </Button>
      </Form>
    </div>
  );
});
