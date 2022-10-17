import React from "react";
import {
  useStore,
  GoogleCaptcha as IkasGoogleCaptcha,
  createTranslationInputData,
} from "@ikas/storefront";
import { IkasStorefrontConfig } from "@ikas/storefront-config";
import { observer } from "mobx-react-lite";

import * as S from "./style";

const GoogleCaptcha = (props: { i18nFileName: string }) => {
  const store = useStore();

  if (!store.customerStore.isCaptchaRequired) return null;
  return (
    <>
      <IkasGoogleCaptcha />
      <GoogleCaptchaText i18nFileName={props.i18nFileName} />
    </>
  );
};

export default observer(GoogleCaptcha);

type GoogleCaptchaTextProps = {
  i18nFileName: string;
};

const GoogleCaptchaText = (props: GoogleCaptchaTextProps) => {
  const translation =
    IkasStorefrontConfig.getTranslations()[props.i18nFileName];
  const textData = React.useMemo(
    () => createTranslationInputData(translation?.captchaText),
    [translation]
  );
  const text = React.useMemo(
    () => (
      <S.TextWrapper>
        {textData.map((p, index) => {
          if (!p.isVariable) {
            return <span key={index}>{p.value}</span>;
          }

          if (p.value === "{{ privacyPolicy }}") {
            return (
              <S.Link
                key={index}
                href="https://policies.google.com/privacy"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {translation.privacyPolicy}
              </S.Link>
            );
          }

          if (p.value === "{{ termsOfService }}") {
            return (
              <S.Link
                key={index}
                href="https://policies.google.com/terms"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                {translation.termsOfService}
              </S.Link>
            );
          }
        })}
      </S.TextWrapper>
    ),
    [textData]
  );

  return text;
};
