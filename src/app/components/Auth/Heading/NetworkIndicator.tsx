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
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

export interface IOptionButtonProps {
    className?: string;
    navigateUrl: string;
    status: 'PENDING' | 'ONLINE' | 'OFFLINE';
}

const NetworkIndicator: React.SFC<IOptionButtonProps> = props => (
    <Link to={props.navigateUrl} className={props.className}>
        <div className="button-title">
            {'PENDING' === props.status && <FormattedMessage id="general.network.connecting" defaultMessage="Connecting..." />}
            {'OFFLINE' === props.status && <FormattedMessage id="general.network.offline" defaultMessage="Offline" />}
            {'ONLINE' === props.status && props.children}
        </div>
        <em className="button-icon" />
    </Link>
);

export default styled(NetworkIndicator)`
    text-decoration: none !important;
    border: 0;
    background: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;

    &:hover {
        color: #76a6e2;
    }

    .button-icon {
        margin-left: 8px;
        width: 8px;
        height: 8px;
        background-color: #ccc;
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;

        ${props => 'PENDING' === props.status ? 'background-color: #E6C366' : ''};
        ${props => 'ONLINE' === props.status ? 'background-color: #6AC751' : ''};
    }

    .button-title {
        vertical-align: middle;
        display: inline-block;
        line-height: 40px;
        max-width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;