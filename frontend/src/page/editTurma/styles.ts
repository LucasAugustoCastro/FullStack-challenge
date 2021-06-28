import styled from 'styled-components'

import { shade } from 'polished';



export const Content = styled.div`
display:flex;
justify-content: center;
`;
export const Form = styled.form`
  display:flex;
  flex-direction: column;
  margin-top: 30px;
  /* position: relative; */
  max-width: 1120px;
  /* align-items: center;  */
  
  /* background-color: red; */
  width:100%;
  height:100%;
  label{
    font-size: 40px;
    font-style: bold;
  }
  select {
    width: 80%;
    height: 40px;
    border-radius: 5px 0 0 5px;
  }
  button{

    height: 40px;
    width: 200px;
    background: #999591;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, '#999591')};
    }
  }
  `;