import styled from "@emotion/styled";

const ListDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 90px);
  grid-template-rows: repeat(4, 180px);
  column-gap: 1px;
  row-gap: 10px;
  justify-content: center;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  padding-top: 10px;
  @media (max-width: 756px) {
    width: 90%;
  }
`;

const ListItem = styled.div`
  font-size: 10px;
  height: 195px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  background-color: gray;
  width: 90%;
  height: auto;
  min-height: 120px;
  background: #ffffff;
  margin-bottom: 3vh;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  .title {
    margin-bottom: 10px;
    font-weight: bold;
  }
  .author {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        margin-left: 10px;
        margin-bottom: 0px;
        &.admin {
          display: flex;
          align-items: center;
        }
      }
    }
    p {
      color: darkgrey;
      margin-bottom: 0px;
      &.time {
        font-size: 10px;
      }
    }
  }
  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
  .container{
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 200px);
    column-gap: 10px;
    row-gap: 10px;
    justify-content: center;
  }
`;



export { ListDiv, ListItem };
