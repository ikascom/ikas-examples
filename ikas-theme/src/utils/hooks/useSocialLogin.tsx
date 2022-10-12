import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "@ikas/storefront";

type Props = {
  onStatusFail: (error?: string | null) => void;
  onStatusSuccess: () => void;
};

function useSocialLogin(props: Props) {
  const router = useRouter();
  const store = useStore();

  useEffect(() => {
    (async () => {
      const urlSearch = new URLSearchParams(window.location.search);

      const status = urlSearch.get("socialLoginStatus");
      const token = urlSearch.get("socialLoginToken");
      const redirect = urlSearch.get("redirect");

      if (status === "fail") {
        const error = urlSearch.get("socialLoginError");
        props.onStatusFail(error);
        return;
      }

      if (status === "success" && token) {
        const socialLoginTokenResponse =
          await store.customerStore.socialLoginToken(token);

        if (!socialLoginTokenResponse) {
          props.onStatusFail();
          return;
        }

        props.onStatusSuccess();

        setTimeout(() => {
          if (redirect) {
            window.history.replaceState({}, "/account/login", "/account/login");
            router.push(decodeURIComponent(redirect));
          } else {
            router.push("/account");
          }
        }, 1000);
      }
    })();
  }, []);

  const onSocialLogin = async (provider: "google" | "facebook") => {
    store.customerStore.socialLogin(provider);
  };

  return {
    onSocialLogin,
  };
}

export default useSocialLogin;
