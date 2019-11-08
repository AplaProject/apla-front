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
import { INotificationProto } from 'apla/notifications';

import themed from 'components/Theme/themed';

export interface INotificationProps {
    className?: string;
    proto: INotificationProto<any>;
    params: {
        [key: string]: any;
    };
}

const Notification: React.SFC<INotificationProps> = props => (
    <div className={props.className}>
        {props.proto.icon && (
            <div className="notification-icon">
                <em className={props.proto.icon} />
            </div>
        )}
        <div className="notification-body">
            {typeof props.proto.body === 'function'
                ? props.proto.body(props.params)
                : props.proto.body}
        </div>
        {/*<div className="notification-controls">
            <NotificationButton>Confirm</NotificationButton>
            <NotificationButton>Cancel</NotificationButton>
    </div>*/}
    </div>
);

export default themed(Notification)`
    background: #238fd1;
    margin-bottom: 15px;
    padding: 8px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 20px;

    .notification-icon {
        font-size: 16px;
        color: #d5e9f5;
        vertical-align: top;
        margin-right: 15px;
        text-align: right;
    }

    .notification-body {
        font-size: 14px;
        color: #d5e9f5;
    }

    .notification-controls {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
    }
`;
