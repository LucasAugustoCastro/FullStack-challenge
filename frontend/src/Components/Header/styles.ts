import styled from 'styled-components'


export const HeaderContainer = styled.header`
  padding: 10px;
  background: #28262e;
  position: relative;
`;

export const HeaderContent = styled.div`
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div{
    display:flex;
    align-items: center;
    justify-content: center;
    > img {
      height: 60px;
    }

    h1{
      margin-left: 20px;  
      color: #999591;
    }
  }

  button {
    /* margin-left: auto; */
    background: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 30px;
      height: 30px;
    }
  }
`;