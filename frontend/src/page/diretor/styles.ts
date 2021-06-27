import styled, {css} from 'styled-components'

interface navProps {
  open: boolean;
}

export const Container = styled.div`
`;

export const Header = styled.header`
  padding: 20px;
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
    > img {
      height: 80px;
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
export const Drawer = styled.nav<navProps>`

background-color: #3D434F;
width: 350px;
height: 100%;
position:absolute;
transition: all .3s;


${props =>
      !props.open &&
      css`
        transform: translateX(-350px); 
        `}
        
        `;

export const Itens = styled.ul`
  list-style: none;
  align-items: center;
  justify-content: center;
  
  `;

export const ItensContent = styled.li`
  border-bottom: solid 1px black;
  a {
    display: block;
    padding: 20px 5px;
    color: #999591;
    text-decoration: none;
    
    
    &:hover{
      background-color: rgb(176,224,230);
      color: black;
    }
  }
  
  
  `;

export const Content = styled.div`
display:flex;
justify-content: center;
`;
export const Escola = styled.div`
  display:flex;
  /* position: relative; */
  max-width: 1120px;
  align-items: center;
  flex-direction: column;
  
  background-color: red;
  width:100%;
  height:100%;
  `;