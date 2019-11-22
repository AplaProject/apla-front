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
import themed from 'components/Theme/themed';
import classNames from 'classnames';

interface Props {
    className?: string;
    active?: boolean;
    icon: string;
    badge?: number;
    onClick?: () => void;
}

const TabsButton: React.SFC<Props> = props => (
    <li
        className={classNames(props.className, {
            'tabs-button_active': props.active
        })}
    >
        <button className="tabs-button__button" onClick={props.onClick}>
            <div className="tabs-button__icon">
                <em className={props.icon} />
            </div>
            {props.badge ? (
                <div className="tabs-button__badge">
                    {props.badge > 9 ? '*' : props.badge}
                </div>
            ) : null}
            <div className="tabs-button__title">{props.children}</div>
        </button>
    </li>
);

export default themed(TabsButton)`
    text-align: center;
    flex: 1;
    border-right: solid 1px #4d4c4e;

    &.tabs-button_active > .tabs-button__button {
        background: #d8d1c7;
        color: #7a623e;
    }

    > .tabs-button__button {
        padding-top: 10px;
        background: 0;
        border: 0;
        outline: 0;
        color: #fff;
        width: 100%;
        display: block;
        box-sizing: border-box;
        border-radius: 0;
        height: 100%;
        position: relative;

        > .tabs-button__icon {
            font-size: 23px;
            line-height: 24px;
        }

        > .tabs-button__title {
            font-size: 12px;
        }

        > .tabs-button__badge {
            background: #f94b7b;
            width: 16px;
            height: 16px;
            font-size: 10px;
            border-radius: 8px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: 3px;
            margin-top: -23px;
            text-align: center;
            line-height: 16px;
        }
    }
`;
