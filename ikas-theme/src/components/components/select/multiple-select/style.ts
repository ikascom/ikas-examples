import styled from "styled-components";

import { Select } from "src/components/components/select/style";

export const CustomSelect = styled(Select)`
  text-align: left;
`;

export const CustomSelectMenu = styled.ul`
  padding: 10px 0;
  z-index: 10;
  margin-top: 4px;
  background-color: white;
  position: absolute;
  width: 100%;

  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  border-radius: 12px;
`;
export const CustomSelectMenuOption = styled.li`
  padding: 6px 20px 6px;
`;
