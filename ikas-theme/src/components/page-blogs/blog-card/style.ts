import styled from "styled-components";

import { mediaQuery } from "src/styles/breakpoints";

export const BlogCard = styled.article`
  position: relative;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.color.border};
`;

export const BlogImage = styled.picture`
  position: relative;
  display: block;
  width: 100%;
  overflow: hidden;
`;

export const BlogContent = styled.div`
  padding: 20px 10px;

  ${mediaQuery.sm} {
    padding: 10px;
  }
`;

export const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.secondaryText};
  font-size: ${({ theme }) => theme.fontSize.sm};

  ${mediaQuery.lg} {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

export const PublishedDate = styled.div`
  display: inline-block;
`;
export const Author = styled.div`
  display: inline-block;
  text-align: right;
`;
export const TitleAnchor = styled.a`
  display: block;
`;
export const Title = styled.div`
  color: ${({ theme }) => theme.color.primaryText};
  text-align: center;
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: justify;
  ${mediaQuery.lg} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
export const Description = styled.p`
  margin: 16px 0;
  text-align: center;
  text-align: justify;
  color: ${({ theme }) => theme.color.secondaryText};
`;
export const Category = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;

  a {
    display: block;
    padding: 12px 4px;
    background-color: ${({ theme }) => theme.color.buttonBg};
    color: ${({ theme }) => theme.color.button};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;
export const DetailLink = styled.div`
  margin-top: auto;
  text-align: center;

  a {
    color: ${({ theme }) => theme.color.link};
  }
`;
