import React from "react";

import { Switch, Route } from 'react-router'
import DiretorDashboard from "../page/diretor/diretorDashbord";
import Turma from "../page/turma/turma";
import EditTurma from "../page/editTurma";

// import Route from './Route';

const Routes: React.FC = () => (
    <Switch>
      <Route path="/diretor/dashboard" exact component={DiretorDashboard}/>
      <Route path="/diretor/turma/editar/:idTurma+" exact component={EditTurma}/>
      <Route path="/diretor/turma/:idTurma+" exact component={Turma}/>
    </Switch>

);

export default Routes;