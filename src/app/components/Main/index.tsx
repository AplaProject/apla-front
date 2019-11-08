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
import { Redirect } from 'react-router';
import { routes } from 'lib/routing';

import MainLayout from 'components/Layout/Main';
import Power from 'components/Legal/Power';

interface Props {
    app?: string;
    page?: string;
    action?: string;
}

const Main: React.SFC<Props> = props => {
    const Route = routes[props.app];
    const headerProps =
        Route && Route.mapHeaderParams ? Route.mapHeaderParams(props) : props;
    const contentProps =
        Route && Route.mapContentParams ? Route.mapContentParams(props) : props;

    if (Route) {
        return (
            <MainLayout
                header={<Route.Header {...headerProps} />}
                legal={<Power />}
            >
                <Route.Content {...contentProps} />
            </MainLayout>
        );
    } else {
        return <Redirect to="/browse" />;
    }
};

export default Main;
