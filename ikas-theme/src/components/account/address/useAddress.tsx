import React, { useState, useEffect } from "react";
import {
  AddressForm,
  IkasCustomer,
  IkasCustomerAddress,
  useStore,
  useTranslation,
} from "@ikas/storefront";

import { NS } from "../";

export default function useAddress() {
  const store = useStore();
  const { t } = useTranslation();
  const [addressForm, setAddressForm] = useState<AddressForm>();
  const [isNewAddressFormVisible, setAddressFormVisibility] = useState(false);

  const isAddressFormVisible = isNewAddressFormVisible && !!addressForm;
  const addressesCount = store.customerStore?.customer?.addresses?.length ?? 0;
  const hasAddress = !!addressesCount;

  const createAddressForm = (address?: IkasCustomerAddress) => {
    const form = new AddressForm({
      address: address || new IkasCustomerAddress(),
      message: {
        requiredRule: t(`${NS}:address.requiredRule`),
        phoneRule: (model) =>
          t(`${NS}:address.phoneRule`, { phoneNumber: model.phone || "" }),
      },
    });
    form.onAddressPostalCodeChange("");
    return form;
  };

  const onAddNewAddressClick = () => {
    setAddressForm(createAddressForm());
  };

  const onAddressSave = async () => {
    if (!addressForm) return;
    const result = await addressForm.submit();
    if (!result?.isSuccess) return;
    setAddressForm(undefined);
  };

  const onAddressDelete = async (
    address: IkasCustomerAddress,
    index: number
  ) => {
    const customer = new IkasCustomer(store.customerStore.customer!);
    customer.addresses?.splice(index, 1);
    const success = await store.customerStore.saveCustomer(customer);
  };

  const onAddresEdit = (address: IkasCustomerAddress, index: number) => {
    const customerAddress = new IkasCustomerAddress(
      new IkasCustomerAddress(address)
    );
    setAddressForm(createAddressForm(customerAddress));
  };

  const onAddressFormClose = () => {
    setAddressForm(undefined);
  };

  useEffect(() => {
    if (addressForm) {
      setAddressFormVisibility(true);
    } else {
      setAddressFormVisibility(false);
    }
  }, [addressForm]);

  useEffect(() => {
    if (!addressesCount) setAddressForm(createAddressForm());
  }, [addressesCount]);

  return {
    isAddressFormVisible,
    addressForm,
    addressesCount,
    hasAddress,
    onAddNewAddressClick,
    onAddressFormClose,
    onAddressDelete,
    onAddresEdit,
    onAddressSave,
  };
}
