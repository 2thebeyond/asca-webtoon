import styled from "@emotion/styled";

const SpinnerDiv = styled.div`
  width: 100%;
  height: calc(100vh - 2rem);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  button {
    border-radius: 15px;
    padding: 5px 10px;
    font-weight: bold;
    &.edit {
      background-color: white;
      color: black;
      border: 1px solid black;
      &:hover {
        background-color: black;
        color: white;
        border: 1px solid black;
      }
    }
    &.delete {
      margin-left: 10px;
      background-color: red;
      color: white;
      border: 1px solid red;
      &:hover {
        background-color: white;
        color: red;
        border: 1px solid red;
      }
    }
  }
`;

export { SpinnerDiv, BtnDiv };