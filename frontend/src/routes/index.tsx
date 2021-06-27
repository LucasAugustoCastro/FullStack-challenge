import React from "react";

import { Switch, Route } from 'react-router'
import DiretorDashboard from "../page/diretor/diretorDashbord";
import Turma from "../page/turma/turma";

// import Route from './Route';

const Routes: React.FC = () => (
    <Switch>
      <Route path="/diretor/dashboard" component={DiretorDashboard}/>
      <Route path="/diretor/turma/:idEscola+" component={Turma}/>
    </Switch>

);

export default Routes;