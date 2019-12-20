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

interface Props {
    className?: string;
    onTrigger?: () => void;
}

interface State {
    count: number;
}

class DevHook extends React.Component<Props, State> {
    state: State = {
        count: 0
    };

    private _interval: any;

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    setupInterval() {
        clearInterval(this._interval);
        this._interval = setInterval(() => {
            this.setState(() => ({
                count: 0
            }));
        }, 500);
    }

    handleClick = () => {
        const newValue = this.state.count + 1;

        if (newValue >= 5) {
            if (this.props.onTrigger) {
                this.props.onTrigger();
            }
        } else {
            this.setupInterval();
            this.setState(() => ({
                count: newValue
            }));
        }
    };

    render() {
        return (
            <button
                className={this.props.className}
                onClick={this.handleClick}
            />
        );
    }
}

export default themed(DevHook)`
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    opacity: 0;
    cursor: default;
`;
