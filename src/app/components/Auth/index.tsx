// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import React from 'react';
import { Route, Switch } from 'react-router';
import Brand from 'components/Layout/Brand';
import Welcome from './Welcome';
import AccountList from 'containers/AccountList';
import SignUp from './SignUp';
import Recover from './Recover';

// import Window from 'components/Window';
// import Button from 'components/Button/Button';
// import HeaderSeparator from 'components/Header/HeaderSeparator';
// import Header from 'components/Header';

interface Props {
    className?: string;
    isEmpty: boolean;
    networkStatus: 'ONLINE' | 'OFFLINE' | 'PENDING';
    activationEnabled: boolean;
    onCreate: () => any;
    onRecover: () => any;
}

const Auth: React.SFC<Props> = props => (
    <Brand>
        <Switch>
            {props.isEmpty ? (
                <Route path="/" exact component={Welcome} />
            ) : null}

            {props.isEmpty ? (
                <Route path="/" exact component={AccountList} />
            ) : null}

            <Route path="/signup" component={SignUp} />
            <Route path="/recover" component={Recover} />
        </Switch>
    </Brand>
    // <Window
    //     className={props.className}
    //     type="brand"
    //     header={
    //         <Header vertical>
    //             <HeaderSeparator />
    //         </Header>
    //     }
    //     footer={
    //         <div>
    //             <Button
    //                 className="btn btn-primary btn-block"
    //                 onClick={props.onCreate}
    //             >
    //                 Create or Recover Account
    //             </Button>
    //             <div
    //                 style={{
    //                     textAlign: 'center',
    //                     marginTop: 10,
    //                     marginBottom: 10
    //                 }}
    //             >
    //                 Powered by&nbsp;
    //                 <a
    //                     href="https://apla.io"
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     Apla
    //                 </a>
    //             </div>
    //         </div>
    //     }
    // >
    //     <AccountList />
    // </Window>
);

export default Auth;
