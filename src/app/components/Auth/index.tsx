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
import { Route, Switch, Redirect } from 'react-router';
import Brand from 'components/Layout/Brand';
import SignIn from 'containers/Auth/SignIn';
import Welcome from 'containers/Auth/Welcome';
import SignUp from './SignUp';
import Recover from './Recover';

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
            ) : (
                <Route path="/" exact component={SignIn} />
            )}

            <Route path="/signup" component={SignUp} />
            <Route path="/recover" component={Recover} />
            <Redirect to="/" />
        </Switch>
    </Brand>
);

export default Auth;
