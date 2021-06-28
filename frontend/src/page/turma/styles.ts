import styled, {css} from 'styled-components'
import { shade } from 'polished';
interface navProps {
  open: boolean;
}

export const Container = styled.div`
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
export const TurmaContent = styled.div`
  display:flex;
  margin-top: 40px;
  max-width: 1120px;
  align-items: center;
  flex-direction: column;
  width:100%;
  height:100%;
  `;
export const TurmaHead = styled.div`
display:flex;
width:100%;
justify-content:space-between;
align-items: center;
margin: 0 0 10px 0  ;
/* background-color: #000; */
  a {
    color: #999591;
    text-decoration: none;

  }
  div {
    
    padding: 10px;
    background-color: #28262e;
    border-radius: 5px;

    &:hover {
      background: ${shade(0.2, '#28262e')};
      cursor: pointer;
    }
  }
`;

export const Professor = styled.div`
  width: 80%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  h1{
    margin-left: 10px;
  }
  p{
    margin-left: 10px;
    font-size: 15px;
  }
  b{
    margin-left: 10px;
    font-size: 18px;

  }

  & + div{
    margin-top: 10px;
  }
`;

export const Aluno = styled.div`
  width: 80%;
  
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  h1{
    margin-left: 10px;
  }
  p{
    margin-left: 10px;
    font-size: 15px;
  }
  b{
    margin-left: 10px;
    font-size: 18px;

  }

  & + div{
    margin-top: 10px;
  }


`;