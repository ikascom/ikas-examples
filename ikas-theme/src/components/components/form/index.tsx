import React from "react";

type Props = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = (props: Props) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(event);
  };

  return <form onSubmit={onSubmit}>{props.children}</form>;
};

export default Form;
