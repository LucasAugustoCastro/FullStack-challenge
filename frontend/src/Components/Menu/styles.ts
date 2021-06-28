
import styled, {css} from 'styled-components'
interface navProps {
  open: boolean;
}

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