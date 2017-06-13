import * as React from 'react';
import * as block from 'bem-cn';
import { bind } from 'decko';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/bootstrap.paper.min.css';
import 'shared/view/styles/base.scss';
import './styles.scss';
import './fonts';
import { Counter } from 'features/testFeature';

let key: number = 0;

class App extends React.Component<{}, {}> {
  private counters: JSX.Element[] = [];

  public render() {
    const b = block('application');
    // const { children } = this.props;

    return (
      <div className={b}>
        <button onClick={this.addInstance}>Add</button>
        <button onClick={this.shiftInstance}>Shift</button>
        {this.counters}
      </div>
    );
  }

  @bind
  private addInstance() {
    this.counters.push(<Counter key={key++} ownText={`Counter #${key}`} />);
    this.forceUpdate();
  }

  @bind
  private shiftInstance() {
    this.counters.shift();
    this.forceUpdate();
  }
}

export default App;
