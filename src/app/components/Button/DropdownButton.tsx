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
import propTypes from 'prop-types';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

import Dropdown from 'components/Dropdown';
import Button from './';

type ButtonComponent = React.ComponentType<{
    onClick: (e: React.MouseEvent<any>) => void;
    disabled?: boolean;
    className?: string;
}>;

interface Props {
    buttonComponent?: ButtonComponent;
    disabled?: boolean;
    className?: string;
    active?: boolean;
    content: React.ReactNode;
    dropdownStyle?: React.CSSProperties;
    align?: 'left' | 'right';
    direction?: 'up' | 'down';
    menuWidth?: number;
    onClick?: () => any;
}

interface State {
    active: boolean;
}

class DropdownButton extends React.Component<
    Props & InjectedOnClickOutProps,
    State
> {
    state: State = {
        active: false
    };

    static childContextTypes = {
        closeDropdown: propTypes.func.isRequired
    };

    getChildContext = () => ({
        closeDropdown: () => {
            this.setState({
                active: false
            });
        }
    });

    handleClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }

        if (this.props.content) {
            this.setState({
                active: !this.state.active
            });
        }
    };

    handleClickOutside = (_event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            active: false
        });
    };

    render() {
        const Component = this.props.buttonComponent || Button;
        return (
            <div
                style={{
                    display: 'inline-block',
                    position: 'relative'
                }}
            >
                <Component
                    disabled={this.props.disabled}
                    className={this.props.className}
                    onClick={this.handleClick}
                >
                    {this.props.children}
                </Component>
                <div style={this.props.dropdownStyle}>
                    <Dropdown
                        active={this.state.active}
                        align={this.props.align}
                        direction={this.props.direction}
                        width={this.props.menuWidth}
                    >
                        {this.props.content}
                    </Dropdown>
                </div>
            </div>
        );
    }
}

export default onClickOutside(DropdownButton);
