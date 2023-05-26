import './App.css';
import Home from './Views/Home/Home.jsx';
import Landing from './Views/Landing/Landing';
import { Route } from 'react-router-dom';
import Detail from './Views/Detail/Detail';
import Form from './Views/Form/Form';

function App() {
  //const location = useLocation();
  return (
    <div className="App">
    <Route exact path="/">  <Landing/> </Route>   
    <Route path="/home" render={() => <Home/>}/>   
    <Route path="/detail" render={() => <Detail/>}/>
    <Route path="/form" render={() => <Form/>}/>  
    </div>
  );
}

export default App;
