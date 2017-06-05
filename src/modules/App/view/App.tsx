import * as React from 'react';
import * as block from 'bem-cn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/bootstrap.paper.min.css';
import 'shared/view/styles/base.scss';
import './styles.scss';
import './fonts';
import { Counter } from 'features/testFeature';

class App extends React.Component<{}, {}> {
  public render() {
    const b = block('application');
    // const { children } = this.props;

    return (
      <div className={b}>
        <Counter ownText="own text" />
        <Counter ownText="some text" />
        <Counter ownText="test text" />
      </div>
    );
  }
}

export default App;
