
import { Switch, Route } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
import Post from './Components/Post/Post'
// import Nav from './Components/Nav/Nav'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Form from './Components/Form/Form'

export default (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/dash" component={Dash} />
        <Route path="/post/:id" component={Post} />
        <Route path="/form" component={Form} />
        {/* <Route exact path="/" component={Home} /> */}
    </Switch>
)