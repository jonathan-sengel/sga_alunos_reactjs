import React from 'react';
import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Register/RegisterPage';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isHome: false, isRegister: true };
  }

  onChangePage = () => {
    this.setState({
      isHome: !this.state.isHome,
      isRegister: !this.state.isRegister,
    })
  }

  render() {
    const { isHome, isRegister } = this.state;
    return (
      <>
        {isHome && <HomePage actionClick={this.onChangePage} />}
        {isRegister && <RegisterPage actionClick={this.onChangePage} />}
      </>
    )
  }
}

export default App;