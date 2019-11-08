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
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

const animationDuration = 300;
const animationDef = {
    defaultStyle: {
        transition: `transform ${animationDuration}ms cubic-bezier(0,0.5,0.5,1),opacity ${animationDuration}ms`,
        opacity: 1
    },
    entering: {
        opacity: 0
    },
    entered: {
        opacity: 1
    },
    exiting: {
        transition: `transform ${animationDuration}ms cubic-bezier(1,0.4,0.2,1),opacity ${animationDuration}ms`,
        opacity: 0
    },
    exited: {
        display: 'none'
    }
};

const Fade: React.SFC<{ in?: boolean }> = props => (
    <Transition in={props.in} timeout={{ enter: 0, exit: animationDuration }}>
        {(state: string) => (
            <div
                style={{ ...animationDef.defaultStyle, ...animationDef[state] }}
            >
                {props.children}
            </div>
        )}
    </Transition>
);

export interface IStreamGroupProps {
    items: {
        key: string;
        content: JSX.Element;
    }[];
}

const StreamGroup: React.SFC<IStreamGroupProps> = props => (
    <TransitionGroup>
        {props.items.map(item => (
            <Fade key={item.key}>{item.content}</Fade>
        ))}
    </TransitionGroup>
);

export default StreamGroup;
