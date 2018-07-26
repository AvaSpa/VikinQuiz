import * as React from 'react';
import './App.css';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';


class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <SignUpPage />
      </div>
    );
  }
}

export default App;