import * as React from 'react';
import * as block from 'bem-cn';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/bootstrap.paper.min.css';
import 'shared/view/styles/base.styl';
import * as styles from './styles.styl';
import './fonts';

interface Props {}

class App extends React.Component<Props, null> {
    render () {
        const b = block('application');
        const {children} = this.props;

        return (
            <div className={styles[b()]}>
                {children}
            </div>
        );
    }
}

export {Props};
export default App;