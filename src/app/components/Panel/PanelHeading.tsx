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
import * as Icons from 'react-feather';

interface Props {
    className?: string;
    leftButton?: {
        icon: keyof typeof Icons;
        onClick: () => void;
    };
    rightButton?: {
        icon: keyof typeof Icons;
        onClick: () => void;
    };
}

const PanelHeading: React.SFC<Props> = props => {
    const LeftButton: React.ComponentType<Icons.Props> =
        Icons[props.leftButton ? props.leftButton.icon : ''];
    const RightButton: React.ComponentType<Icons.Props> =
        Icons[props.rightButton ? props.rightButton.icon : ''];

    return (
        <div className={props.className}>
            <div className="panel-heading__left">
                {LeftButton && (
                    <button
                        className="panel-heading__button"
                        onClick={props.leftButton.onClick}
                    >
                        <LeftButton size={24} />
                    </button>
                )}
            </div>
            <div className="panel-heading__body">{props.children}</div>
            <div className="panel-heading__right">
                {RightButton && (
                    <button
                        className="panel-heading__button"
                        onClick={props.rightButton.onClick}
                    >
                        <RightButton size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default themed(PanelHeading)`
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
    margin-bottom: 15px;

    & .panel-heading__left, .panel-heading__right {
        width: 40px;
        height: 40px;
    }

    & .panel-heading__button {
        width: 40px;
        height: 40px;
        background: 0;
        border: 0;

        > svg {
            vertical-align: middle;
            stroke: #7a623e;
        }

        &:hover > svg {
            stroke: #af946c;
        }
    }

    & .panel-heading__body {
        flex: 1;
        text-align: center;
        font-weight: 500;
        font-size: 18px;
    }
`;
