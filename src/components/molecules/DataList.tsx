import React from "react";
import styled from "styled-components";

type ObjectListProps = {
  name: string;
  handleClick: () => void;
};

type DataListProps = {
  listItems: (string | ObjectListProps)[];
};

const DataList: React.FC<DataListProps> = ({ listItems }) => {
  // This helper function will determine how to handle the click based on the item type
  const handleListItemClick = (item: string | ObjectListProps) => {
    if (typeof item === "string") {
      console.log(`${item} clicked!`);
      // Add your click logic for string items here
    } else {
      item.handleClick();
      // The click logic for ObjectListProps is embedded in the object itself
    }
  };

  return (
    <List>
      {listItems.map((item, index) => {
        const key = typeof item === "string" ? item : item.name;
        const content = typeof item === "string" ? item : item.name;

        return (
          <ListItem key={key} onClick={() => handleListItemClick(item)}>
            {content}
          </ListItem>
        );
      })}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: #f7f7f7;
  overflow: hidden;
`;

const ListItem = styled.li`
  padding: 15px 20px;
  border-bottom: 1px solid #e1e1e1;
  background-color: #333;
  text-align: left;
  font-size: 16px;
  color: #f8f8f8;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: gray;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

export default DataList;
