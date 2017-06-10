import * as React from 'react';
import * as block from 'bem-cn';
import { TestForm } from 'features/reduxForm';

import './App.scss';

class App extends React.Component<{}, {}> {
  public render() {
    const b = block('application');
    const { children } = this.props;

    return (
      <div className={b}>
        <TestForm onSubmit={data => { console.log(data); }} />
        {children}
      </div>
    );
  }
}

export default App;
