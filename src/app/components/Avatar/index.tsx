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
import imgAvatar from './avatar.svg';

export interface IAvatarProps {
    className?: string;
    url: string;
    size?: number;
}

interface IAvatarState {
    error: boolean;
}

class Avatar extends React.Component<IAvatarProps, IAvatarState> {
    constructor(props: IAvatarProps) {
        super(props);
        this.state = {
            error: false
        };
    }

    onError = () => {
        this.setState({
            error: true
        });
    };

    render() {
        return (
            <div className={this.props.className}>
                <img
                    className="avatar__image"
                    src={this.state.error ? imgAvatar : this.props.url}
                    onError={this.onError}
                />
            </div>
        );
    }
}

export default styled(Avatar)`
    display: inline-block;
    vertical-align: top;
    width: ${props => (props.size ? props.size + 'px' : 'auto')};
    height: ${props => (props.size ? props.size + 'px' : 'auto')};

    .avatar__image {
        max-width: ${props => (props.size ? props.size + 'px' : '100%')};
        max-height: ${props => (props.size ? props.size + 'px' : '100%')};
        vertical-align: top;
    }
`;
