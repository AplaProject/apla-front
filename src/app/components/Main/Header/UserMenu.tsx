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
import { IAccountContext } from 'apla/auth';
import { IEcosystemInfo } from 'apla/api';

import HeaderButton from './HeaderButton';
import Avatar from 'containers/Avatar';
import themed from 'components/Theme/themed';
import Item from 'components/Dropdown/Item';
import media from 'components/Theme/media';

const StyledUserMenu = themed.div`
    display: inline-block;
    padding: 0 15px 0 50px !important;
    flex-direction: row;
    height: 40px;
    background: linear-gradient(#5e5e5e, #444444);
    border-radius: 20px;
    position: relative;

    > .user-info {
        color: #fff;
        font-weight: 500;
        font-size: 16px;
        line-height: 40px;
    }

    > .user-avatar {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: solid 2px #fff;
        overflow: hidden;
    }

    .user-dropdown {
        background: #fff;
        box-shadow: 0 0 25px rgba(0,0,0,.15);
        border-left: solid 1px #add1ff;
        border-bottom: solid 1px #add1ff;
    }

    @media (${media.lg}) {
        padding: 0 !important;
        width: 40px;

        > .user-info {
            display: none;
        }
    }
`;

interface Props {
    isDefaultWallet: boolean;
    wallet?: IAccountContext;
    walletEcosystems: IEcosystemInfo[];
    onSwitchEcosystem: (ecosystem: string, defaultRole?: boolean) => void;
    onLogout: () => void;
    onChangePassword: () => void;
    onBackup: () => void;
}

const UserMenu: React.SFC<Props> = props =>
    props.wallet &&
    props.wallet.wallet && (
        <HeaderButton
            align="right"
            menuWidth={216}
            content={
                <div>
                    {!props.isDefaultWallet && (
                        <>
                            <Item
                                onClick={props.onChangePassword}
                                icon="icon-key text-muted"
                            >
                                <FormattedMessage
                                    id="general.wallet.changepassword"
                                    defaultMessage="Change password"
                                />
                            </Item>
                            <Item
                                onClick={props.onBackup}
                                icon="icon-shield text-muted"
                            >
                                <FormattedMessage
                                    id="general.wallet.backup"
                                    defaultMessage="Backup account"
                                />
                            </Item>
                        </>
                    )}
                    <Item
                        onClick={props.onLogout}
                        icon="icon-logout text-danger"
                    >
                        <FormattedMessage
                            id="general.wallet.signout"
                            defaultMessage="Sign out"
                        />
                    </Item>
                </div>
            }
        >
            <StyledUserMenu>
                <div className="user-info">{props.wallet.wallet.address}</div>
                <Avatar
                    className="user-avatar"
                    size={36}
                    account={props.wallet.wallet.address}
                    ecosystem={props.wallet.access.ecosystem}
                />
            </StyledUserMenu>
        </HeaderButton>
    );

export default UserMenu;
