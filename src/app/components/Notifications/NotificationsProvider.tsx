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
import { INotification, INotificationProto } from 'apla/notifications';

import StreamGroup from '../Animation/StreamGroup';
import Notification from './Notification';
import TxSuccessNotification from './Types/TxSuccessNotification';
import InvalidPasswordNotification from './Types/InvalidPasswordNotification';
import TxBatchNotification from './Types/TxBatchNotification';
import EcosystemInvitedNotification from './Types/EcosystemInvitedNotification';
import CopiedToClipboard from './Types/CopiedToClipboard';

const definitions: { [key: string]: INotificationProto<any> } = {
    TX_BATCH: TxBatchNotification,
    TX_SUCCESS: TxSuccessNotification,
    INVALID_PASSWORD: InvalidPasswordNotification,
    ECOSYSTEM_INVITED: EcosystemInvitedNotification,
    COPIED_TO_CLIPBOARD: CopiedToClipboard
};

export interface INotificationsProviderProps {
    notifications: INotification[];
    spawnNotification: (notification: INotification) => void;
    destroyNotification: (id: string) => void;
}

class NotificationsProvider extends React.Component<
    INotificationsProviderProps
> {
    render() {
        return (
            <div
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 10000
                }}
            >
                <StreamGroup
                    items={this.props.notifications.map(n => {
                        const proto = definitions[n.type];
                        return proto
                            ? {
                                  key: n.id,
                                  content: (
                                      <Notification
                                          proto={proto}
                                          params={n.params}
                                      />
                                  )
                              }
                            : null;
                    })}
                />
            </div>
        );
    }
}

export default NotificationsProvider;
