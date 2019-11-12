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
import { TProtypoElement } from 'apla/protypo';

import HeaderButton from './HeaderButton';
import Protypo from 'containers/Widgets/Protypo';
import Heading from 'components/Dropdown/Heading';
import Info from 'components/Dropdown/Info';

interface Props {
    offline: boolean;
    count: number;
    mainSection: string;
    notificationsBody: TProtypoElement[];
}

const NotificationsMenu: React.SFC<Props> = props => (
    <HeaderButton
        badge={props.count}
        warning={props.offline}
        align="right"
        menuWidth={320}
        content={
            <div style={{ overflow: 'hidden' }}>
                <Heading>
                    {props.offline ? (
                        <FormattedMessage
                            id="general.error.socket"
                            defaultMessage="Notifications are unavailable"
                        />
                    ) : (
                        <FormattedMessage
                            id="notifications"
                            defaultMessage="Notifications"
                        />
                    )}
                </Heading>
                <div>
                    {props.offline ? (
                        <Info>
                            <FormattedMessage
                                id="general.error.socket.desc"
                                defaultMessage="Failed to establish connection to the WebSocket server. Check your configuration"
                            />
                        </Info>
                    ) : (
                        <Protypo
                            section={props.mainSection}
                            context="menu"
                            content={props.notificationsBody}
                        />
                    )}
                </div>
            </div>
        }
    >
        {props.offline ? (
            <em className="icon fa fa-exclamation" />
        ) : (
            <em className="fa fa-bell" />
        )}
    </HeaderButton>
);

export default NotificationsMenu;
