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
import { FormattedMessage } from 'react-intl';
import themed from 'components/Theme/themed';
import { Link } from 'react-router-dom';

interface Props {
    className?: string;
}

const Welcome: React.SFC<Props> = props => (
    <div className={props.className}>
        <div className="welcome__block">
            <h3 className="welcome__heading">
                <FormattedMessage id="auth.welcome" defaultMessage="Welcome" />
            </h3>
        </div>

        <div className="welcome__block">
            <Link to="/signup" className="welcome__signup">
                Sign up
            </Link>
        </div>

        <div className="welcome__block">
            <Link to="/recover" className="welcome__recover">
                Recover access
            </Link>
        </div>
    </div>
);

export default themed(Welcome)`
    text-align: center;

    & .welcome__block {
        margin: 26px;
    }
    
    & .welcome__heading {
        color: #fff;
        font-weight: 500;
    }

    & .welcome__signup {
        background: #d8d1c7;
        border: 0;
        text-transform: uppercase;
        color: #7a623e;
        border-radius: 31px;
        padding: 10px;
        min-width: 260px;
        font-size: 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    & .welcome__recover {
        padding: 10px;
        border: 0;
        background: 0;
        font-size: 16px;
        color: #fff;
        text-transform: uppercase;
        min-width: 260px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }
`;
